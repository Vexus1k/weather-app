import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  DoCheck,
  HostListener,
  OnChanges,
  OnInit, SimpleChanges
} from '@angular/core';
import ScrollReveal from "scrollreveal";
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import {WeatherService} from "../../../core/services/weather.service";
import {getDataFromObject} from "../../../core/models/global-interfaces";
import {keys} from "lodash";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  locationIconPath: string = '../../../../../assets/photos/location-icon.svg';
  screenHeight: number;
  screenWidth: number;
  isLoggedIn: boolean;
  alertCondition: boolean;
  inputCondition: boolean;
  locationInfo: getDataFromObject;
  inputValueCity: string = '';
  localizationIcon: HTMLElement | null;
  searchIcon: HTMLElement | null;
  searchBox: HTMLElement | null;
  localTimeForCurrentCity: string;
  isAmHour: boolean = true;

  ngDoCheck() {
    this.isLoggedIn = this.auth.isLoggedIn()
    this.getScreenSize()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
    this.inputCondition = this.inputValueCity === ''

  }
  ngOnInit() {
    this.searchIcon = document.querySelector('.ri-search-line')
    this.searchBox = document.querySelector('.search-box')
    this.localizationIcon = document.querySelector(".location__icon")
    this.isLoggedIn = this.auth.isLoggedIn()
    this.alertCondition = this.screenWidth > 1039 && this.isLoggedIn || !this.isLoggedIn
    this.inputCondition = this.inputValueCity === ''
    this.getScreenSize()
    this.getObjectWithLocationInfo()
    this.getLocalTimeForCurrentCity()
    setInterval(this.getLocalTimeForCurrentCity, 60000)
    this.getLocalization()
    this.hideAndShowSearchBox()
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
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event?: any) {
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
    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const bodyOffsetHeight = document.body.offsetHeight
    articles.forEach(current  => {
      const articleHeight = current.offsetHeight,
        articleTop = current.offsetTop - 78,
        articleId = current.getAttribute('id');

      if(scrollY > articleTop && scrollY <= articleTop + articleHeight){
        let articleIdSunWidget = 'sun-moon'
        document.querySelector('.nav__menu a[href*=' + articleIdSunWidget + ']')?.classList.remove('active-link')
        document.querySelector('.nav__menu a[href*=' + articleId + ']')?.classList.add('active-link')
      }else{
        document.querySelector('.nav__menu a[href*=' + articleId + ']')?.classList.remove('active-link')
      }
      if((innerHeight + scrollY) >= bodyOffsetHeight){
        let articleIdSunWidget = 'sun-moon'
        let articleIdPrecipitationWidget = 'precipitation'
        document.querySelector('.nav__menu a[href*=' + articleIdPrecipitationWidget + ']')?.classList.remove('active-link')
        document.querySelector('.nav__menu a[href*=' + articleIdSunWidget + ']')?.classList.add('active-link')
      }
    })

  }
  showMenu(){
    const navMenu = document.getElementById('nav-menu');
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'none'});
    navMenu?.classList.add("show-menu");
  }
  closeMenu(){
    const navMenu = document.getElementById('nav-menu');
    const switchersIcons = document.querySelectorAll<HTMLTableElement>('.s-icon');
    Array.from(switchersIcons).forEach((el) => { el.style.display = 'flex'});
    navMenu?.classList.remove('show-menu');
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
    this.weatherService.getLocationId(this.inputValueCity).subscribe((res: getDataFromObject) => {
      this.locationInfo = res.locations[0]
    })
  }
  getLocalization(){
      this.weatherService.getLocationId(this.inputValueCity ? this.inputValueCity : 'Katowice').subscribe((res: getDataFromObject) => {
        this.locationInfo = res.locations[0]
        console.log(this.locationInfo)
        if(!this.locationInfo){
          this.errorService.setErrorStatusAndMessage('City does not exist', false)
        }
      })
      this.inputValueCity = ''
  }
  getLocalTimeForCurrentCity() {
    this.weatherService.getLocalTimeForCurrentCity(this.locationInfo?.timezone || 'Europe/Warsaw').subscribe((res: getDataFromObject)=> {
        this.localTimeForCurrentCity = JSON.stringify(res.datetime)
        let keys = Object.values(this.localTimeForCurrentCity);
        let hour;
        let value: string | undefined;
        for (let i = 0; i < 14; i++) {
          value = this.localTimeForCurrentCity[12] + this.localTimeForCurrentCity[13] +
            this.localTimeForCurrentCity[14] + this.localTimeForCurrentCity[15] + this.localTimeForCurrentCity[16];
          hour = this.localTimeForCurrentCity[12] + this.localTimeForCurrentCity[13]
        }
      if(Number(hour) > 12 && Number(hour) < 24){
        this.isAmHour = false;
      }
        this.localTimeForCurrentCity = value as string
      }
    )
  }
  hideAndShowSearchBox(){
    document.addEventListener('click', event => {
      let isClickInsideElement = this.searchBox?.contains(<Node>(event.target));
      if ((!isClickInsideElement  && this.isLoggedIn)) {
        (this.localizationIcon as HTMLElement).classList.add('hide');
        setTimeout(()=>{(this.localizationIcon as HTMLElement).style.display = 'none'}, 250);
        (document.querySelector('.input__search')as HTMLElement).classList.add('hide');
      }
      else if ((isClickInsideElement  && this.isLoggedIn)) {
        (this.localizationIcon as HTMLElement).classList.remove('hide');
        setTimeout(()=>{(this.localizationIcon as HTMLElement).style.display = 'block'}, 250);
        (document.querySelector('.input__search') as HTMLElement).classList.remove('hide');
      }
    })
  }
  test(event: MouseEvent){
    event.preventDefault();
    return false;
  }
}

