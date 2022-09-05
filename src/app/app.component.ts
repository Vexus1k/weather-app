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

import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {EffectCube, Navigation, Pagination, SwiperOptions, Mousewheel} from "swiper";
import Swiper, {Autoplay} from "swiper";
import {SwiperEvents} from "swiper/types";
import ScrollReveal from "scrollreveal";
import { ErrorService } from './core/services/error.service';
import {first} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";



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
  messageSuccess: string;
  messageError: string;
  success: boolean;
  error: boolean;
  sub: any;

  constructor( private errorService: ErrorService, private router: Router){
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }

  ngOnInit() {
    this.errorService.errorStatusAndMessage.subscribe( (res: {message: string, status: any}) => {
      if(res.status === true){
        this.messageSuccess = res.message;
        this.success = res.status;
        setTimeout(() => {
          this.success = false
        }, 3500)
      }
      else if(res.status === false){
        this.messageError = res.message;
        this.error = true;
        setTimeout(() =>  {
          this.error = false
        }, 3500)
      }
    });
    // console.log(this.sub)
    ScrollReveal().reveal('#login__article', {
      delay: 300,
      scale: 1.4,
      origin: "left",
      distance: "60px"
    });
    ScrollReveal().reveal('.widgets', {
      scale: 0.85,
      easing: 'ease-in',
    });
  }
}









