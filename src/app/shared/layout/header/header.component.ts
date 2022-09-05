import {
  Component,
  DoCheck,
  HostListener, Input,
  OnInit
} from '@angular/core';
import ScrollReveal from "scrollreveal";
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import {WeatherService} from "../../../core/services/weather.service";
import {readDataFromObject} from "../../../core/models/global-interfaces";

// import NodeGeocoder from "node-geocoder";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  @Input() homeRef: HTMLElement | null
  @Input() forecastRef: HTMLElement | null
  @Input() windRef: HTMLElement | null
  @Input() precipitationRef: HTMLElement | null
  @Input() sunMoonRef: HTMLElement | null
  locationIconPath: string = '../../../../../assets/photos/location-icon.svg';
  screenWidth: number;
  isLoggedIn: boolean;
  alertCondition: boolean;
  locationInfo: readDataFromObject | undefined;
  inputValueCity: string;
  oldValueCity: string;
  localTimeForCurrentCity: string;
  isAmHour: boolean = true;
  navMenu: HTMLElement | null;
  ngDoCheck() {
    this.isLoggedIn = this.auth.isLoggedIn()
    this.getScreenSize()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
  }
  ngOnInit() {
    this.inputValueCity = this.weatherService.getCookie("city") || "Katowice"
    this.oldValueCity = this.inputValueCity
    this.navMenu = document.getElementById('nav-menu');
    this.isLoggedIn = this.auth.isLoggedIn()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
    this.getScreenSize()
    // this.getObjectWithLocationInfo()
    // this.getLocalTimeForCurrentCity()
    // setInterval(()=> this.getLocalTimeForCurrentCity(), 1000)
    // this.getLocalization()
    ScrollReveal().reveal('.header', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }
  constructor(private weatherService: WeatherService, private auth: AuthService, private errorService: ErrorService) {
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const bodyOffsetHeight = document.body.offsetHeight
    const header = document.getElementById('header')
    if(window.scrollY >= 50) header?.classList.add('scroll-header'); else header?.classList.remove('scroll-header')
    const articles: HTMLElement[] = [];
    articles.push(
      document.getElementById('home') as HTMLElement,
      document.getElementById('forecast') as HTMLElement,
      document.getElementById('wind') as HTMLElement,
      document.getElementById('precipitation') as HTMLElement,
      document.getElementById('sun-moon') as HTMLElement
    )
    articles.forEach(current => {
      const articleHeight = current.offsetHeight,
        articleTop = current.offsetTop - 78,
        articleId = current.getAttribute('id');

      if(scrollY > articleTop && scrollY <= articleTop + articleHeight){
        let articleIdSunWidget = 'sun-moon__option'
        document.getElementById(`${articleIdSunWidget}`)?.classList.remove('active-link')
        document.getElementById(`${articleId}` + '__option')?.classList.add('active-link')

      }else{
        document.getElementById(`${articleId}`+ '__option')?.classList.remove('active-link')
      }
      if((innerHeight + scrollY) >= bodyOffsetHeight){
        let articleIdSunWidget = 'sun-moon__option'
        let articleIdPrecipitationWidget = 'precipitation__option'
        document.getElementById(`${articleIdPrecipitationWidget}`)?.classList.remove('active-link')
        document.getElementById(`${articleIdSunWidget}`)?.classList.add('active-link')
      }
    })
  }
  showMenu(){
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'none'});
    this.navMenu?.classList.add("show-menu");
  }
  closeMenu(){
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'flex'});
    this.navMenu?.classList.remove('show-menu');
  }
  showError(){
    if(this.isLoggedIn && this.screenWidth > 1039){
      this.errorService.setErrorStatusAndMessage("Disabled for this resolution", false)
    }
    else{
      this.errorService.setErrorStatusAndMessage("Login to use this function", false)
    }
  }
  getObjectWithLocationInfo(){
    this.weatherService.getLocationId(this.inputValueCity).subscribe((res) => {
      if(res.locations[0]){
        this.locationInfo = res.locations[0]
        this.weatherService.setCookie("cityId", res.locations[0].id, 30)
      }
      else{
        console.log(res)
        this.errorService.setErrorStatusAndMessage('Cannot find city', false)
      }
    })
  }
  getLocalization(){
    if(this.inputValueCity === ""){
      this.errorService.setErrorStatusAndMessage('Cannot find city', false)
    }
    else{
      this.weatherService.getLocationId(this.inputValueCity).subscribe((res: readDataFromObject) => {
        if(!res || !res.locations[0]){
          this.errorService.setErrorStatusAndMessage('City does not exist', false)
          this.inputValueCity = ""
        }
        else if(res.locations[0] && res.locations[0].name){
          if(this.oldValueCity != this.inputValueCity){
            this.errorService.setErrorStatusAndMessage('City changed successfully', true)
          }
          this.weatherService.setCookie("city", res.locations[0].name, 30)
          this.weatherService.setCookie("cityId", res.locations[0].id, 30)
          this.locationInfo = res.locations[0]
          this.weatherService.setCityId(res.locations[0].id)
          this.getLocalTimeForCurrentCity()
          this.inputValueCity = ''
        }
      })
    }
  }
  getLocalTimeForCurrentCity() {
    this.weatherService.getLocalTimeForCurrentCity(this.locationInfo?.timezone || 'Europe/Warsaw').subscribe((res: readDataFromObject)=> {
      this.localTimeForCurrentCity = JSON.stringify(res.datetime)
      let keys = Object.values(this.localTimeForCurrentCity);
      let hour: string | undefined;
      let value: string | undefined;
      for (let i = 0; i < keys.length; i++) {
        value = this.localTimeForCurrentCity[12] + this.localTimeForCurrentCity[13] +
          this.localTimeForCurrentCity[14] + this.localTimeForCurrentCity[15] + this.localTimeForCurrentCity[16];
        hour = this.localTimeForCurrentCity[12] + this.localTimeForCurrentCity[13]
      }
      if(Number(hour) >= 12){
        this.isAmHour = false;
      }
      if(Number(hour) === 4 || Number(hour) === 12 || Number(hour) === 17 || Number(hour) === 21){
        this.weatherService.setCookie("currentTime", value as string, 30)
        this.weatherService.setCurrentTime(value as string)
      }
      this.sendCurrentTimeOnTheStartingApp(value as string)
      this.localTimeForCurrentCity = value as string
      }
    )
  }
  sendCurrentTimeOnTheStartingApp(value: string){
    this.sendCurrentTimeOnTheStartingApp = function(){};
    this.weatherService.setCookie("currentTime", value, 30)
    this.weatherService.setCurrentTime(value)
  };
  holdElementOnView(event: MouseEvent){
    event.preventDefault();
    return false;
  }
  getCityFromCoords(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = String(position.coords.latitude)
          let longitude = String(position.coords.longitude)
          console.log('latitude', position.coords.latitude,
            'longitude', position.coords.longitude);
          this.weatherService.getCityFromCoords(latitude, longitude).subscribe((res: readDataFromObject) => {
            this.weatherService.setCookie("city", res.city, 30)
            this.inputValueCity = this.weatherService.getCookie("city")!
            this.errorService.setErrorStatusAndMessage('City changed successfully', true)
            this.getLocalization()
          })
          console.log()
        },
        () => {
          this.errorService.setErrorStatusAndMessage('Allow localization to use this option.', false)
        }
    )
  } else {
      this.errorService.setErrorStatusAndMessage('This option is unavailable for this browser.', false)
  }
  }
  scrollToElement(id: string, el: HTMLElement) {
    this.navMenu?.classList.remove('show-menu');
    document.getElementById(id)?.scrollIntoView()
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link')
    elements.forEach(el => el.classList.add('active-link'))
    el.classList.add('active-link')
  }
}

