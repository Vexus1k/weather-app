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
    ScrollReveal().reveal('.widgets', {
      scale: 0.85,
      easing: 'ease-in',
    });
  }
}









