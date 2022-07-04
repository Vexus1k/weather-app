import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef, HostListener,
  NgZone,
  OnChanges,
  OnInit, QueryList,
  SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core';
import {WeatherService} from "./core/services/weather.service";
// @ts-ignore
import { EventsParams } from 'swiper/angular';
import {stringify} from "flatted";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {EffectCube, Navigation, Pagination, SwiperOptions, Mousewheel} from "swiper";
import Swiper, {Autoplay} from "swiper";
import {SwiperEvents} from "swiper/types";
import ScrollReveal from "scrollreveal";


// install Swiper modules
SwiperCore.use([EffectCube, Mousewheel, Pagination]);
Swiper.use([Autoplay, Navigation]);

declare function set(): void;
declare function setProperty(): void;
declare function scrollPannel(): void;
declare function tillBackground(): void;
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  screenHeight: number;
  screenWidth: number;

  ngOnInit() {
    tillBackground()
    ScrollReveal().reveal('.widgets', {
      scale: 0.85,
      easing: 'ease-in',
    });
    if(this.screenWidth > 2199){
      let windWidget = document.getElementById('wind') as HTMLElement;
      let precipitationWidget = document.getElementById('precipitation') as HTMLElement;
      windWidget?.classList.add('join__rows')
      precipitationWidget?.classList.add('order__rows')
    }
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 2199){
      let windWidget = document.getElementById('wind') as HTMLElement;
      let precipitationWidget = document.getElementById('precipitation') as HTMLElement;

      windWidget?.classList.add('join__rows')
      precipitationWidget?.classList.add('order__rows')
    }
    else{
      let windWidget = document.getElementById('wind') as HTMLElement;
      let precipitationWidget = document.getElementById('precipitation') as HTMLElement;
      windWidget?.classList.remove('join__rows')
      precipitationWidget?.classList.remove('order__rows')
    }
  }
}







