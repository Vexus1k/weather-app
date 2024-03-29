import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostListener,
  OnInit
} from '@angular/core';
import ScrollReveal from "scrollreveal";
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import {WeatherService} from "../../../core/services/weather.service";
import {readDataFromObject} from "../../../core/models/global-interfaces";
import { UntilDestroy } from '@ngneat/until-destroy';
import {first, take, takeUntil, tap} from "rxjs/operators";
import {interval, TimeInterval} from "rxjs";
// import NodeGeocoder from "node-geocoder";
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, DoCheck {
  locationIconPath: string = '../../../../../assets/photos/location-icon.svg';
  screenWidth: number;
  isLoggedIn: boolean;
  alertCondition: boolean;
  locationInfo: readDataFromObject | undefined;
  inputValueCity: string;
  oldValueCity: string;
  localTimeForCurrentCity: string = "";
  isAmHour: boolean;
  navMenu: HTMLElement | null;
  timeInterval: any;

  ngDoCheck() {
    this.isLoggedIn = this.auth.isLoggedIn()
    this.getScreenSize()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
  }

  ngOnInit() {
    this.inputValueCity = this.weatherService.getCookie("city") || "";
    this.oldValueCity = this.inputValueCity
    this.navMenu = document.getElementById('nav-menu');
    this.isLoggedIn = this.auth.isLoggedIn()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
    this.getScreenSize()
    this.getObjectWithLocationInfo()
    this.getLocalization()
    ScrollReveal().reveal('.header', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }

  constructor(private weatherService: WeatherService, private auth: AuthService, private errorService: ErrorService,
              private ref : ChangeDetectorRef) {
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

  showMenu() {
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'none'});
    this.navMenu?.classList.add("show-menu");
  }

  closeMenu() {
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'flex'});
    this.navMenu?.classList.remove('show-menu');
  }

  showError() {
    if(this.isLoggedIn && this.screenWidth > 1039){
      this.errorService.setErrorStatusAndMessage("Disabled for this resolution", false)
    }
    else{
      this.errorService.setErrorStatusAndMessage("Login to use this function", false)
    }
  }

  getObjectWithLocationInfo() {
    this.weatherService.getLocationId(this.inputValueCity).subscribe((res) => {
      if(res.locations[0]){
        this.locationInfo = res.locations[0]
        this.weatherService.setCookie("cityId", res.locations[0].id, 30)
      }
      else{
        this.errorService.setErrorStatusAndMessage('Cannot find city', false)
      }
    })
  }

  getLocalization() {
    if(this.inputValueCity === ""){
      this.errorService.setErrorStatusAndMessage('Cannot find city', false)
      return
    }
    this.weatherService.getLocationId(this.inputValueCity).subscribe((res: readDataFromObject) => {
      if(!res || !res.locations[0]){
        this.errorService.setErrorStatusAndMessage('City does not exist', false)
        this.inputValueCity = ""
        return
      }
      if(this.oldValueCity != this.inputValueCity){
        this.errorService.setErrorStatusAndMessage('City changed successfully', true)
      }
      this.weatherService.setCookie("city", res.locations[0].name, 30)
      this.weatherService.setCookie("cityId", res.locations[0].id, 30)
      this.locationInfo = res.locations[0]
      this.weatherService.setCityId(res.locations[0].id)
      this.getLocalTimeForCurrentCity()
      this.inputValueCity = ''
    })
  }

  getLocalTimeForCurrentCity() {
    let subscription = this.weatherService.getLocalTimeForCurrentCity(this.locationInfo?.timezone)
      .subscribe((res: readDataFromObject)=> {
        if(this.timeInterval){
          clearInterval(this.timeInterval);
        }
        this.localTimeForCurrentCity = JSON.stringify(res.datetime)
        let keys = Object.values(this.localTimeForCurrentCity);
        let hour!: string;
        let minutes!: string;
        let seconds!: string;
        let value!: string;
        for (let i = 0; i < keys.length; i++) {
          hour = this.localTimeForCurrentCity[12] + this.localTimeForCurrentCity[13];
          minutes = this.localTimeForCurrentCity[15] + this.localTimeForCurrentCity[16];
          seconds = this.localTimeForCurrentCity[18] + this.localTimeForCurrentCity[19];
          value = hour + this.localTimeForCurrentCity[14] + minutes;
        }
        if(Number(hour) >= 12){
          this.isAmHour = false;
        }
        this.weatherService.setCookie("currentTime", value as string, 30)
        this.weatherService.setCurrentTime(value as string)
        this.sendCurrentTimeToInitializeApp(value as string)
        this.localTimeForCurrentCity = value as string
        let countSeconds = Number(seconds)
        let countMinutes = Number(minutes)
        let countHour = Number(hour)
        this.timeInterval = setInterval(() => {
          countSeconds += 1
          if(countSeconds == 60){
            countMinutes += 1
            countSeconds = 0
          }
          if(countMinutes == 60){
            countHour += 1
            countMinutes = 0
          }
          value = (countHour < 10 ? `0${countHour}` : countHour) + ':' + (countMinutes < 10 ? `0${countMinutes}` : countMinutes);
          this.localTimeForCurrentCity = value as string
        }, 1000)
      }
    )
    setTimeout( () => {subscription.unsubscribe()}, 1000)
  }

  sendCurrentTimeToInitializeApp(value: string) {
    this.sendCurrentTimeToInitializeApp = function(){};
    this.weatherService.setCookie("currentTime", value, 30)
    this.weatherService.setCurrentTime(value)
  };

  holdElementOnView(event: MouseEvent) {
    event.preventDefault();
    return false;
  }

  getCityFromCoords() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = String(position.coords.latitude)
          let longitude = String(position.coords.longitude)
          let a = this.weatherService.getCityFromCoords(latitude, longitude).subscribe((res: readDataFromObject) => {
            this.weatherService.setCookie("city", res.city, 30)
            this.inputValueCity = this.weatherService.getCookie("city")!
            this.errorService.setErrorStatusAndMessage('City changed successfully', true)
            this.getLocalization()
          })
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
    this.closeMenu()
    document.getElementById(id)?.scrollIntoView()
    let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link')
    elements.forEach(el => el.classList.add('active-link'))
    el.classList.add('active-link')
  }
}

