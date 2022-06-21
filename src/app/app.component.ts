import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
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
  darkStatus: boolean = true;
  optionStatus: string = "theme_1";
  ngOnInit() {
    tillBackground()
    ScrollReveal().reveal('.widgets', {
      scale: 0.85,
      easing: 'ease-in',

    });
  }
  changeStatus(){
    const body = document.getElementById('body');
    this.darkStatus = !this.darkStatus
    if(this.darkStatus && body){
      body.style.backgroundImage = `url(../assets/photos/${this.optionStatus}.jpg)`
    }
    else if(!this.darkStatus && body){
      body.style.backgroundImage = "url(../assets/photos/night-option.jpg)"
    }
  }
  changeBg(className: string){
    const body = document.getElementById('body');
    if(body){
      if(className == "option-1"){
        body.style.backgroundImage = "url(../assets/photos/option-1.jpg)"
        this.optionStatus = "option-1"
        console.log("1")
      }
      else if(className == "option-2"){
        body.style.backgroundImage = "url(../assets/photos/option-2.jpg)"
        this.optionStatus = "option-2"
        console.log("2")
      }
      else if(className == "option-3"){
        body.style.backgroundImage = "url(../assets/photos/option-3.jpg)"
        this.optionStatus = "option-3"
        console.log("3")
      }
      else if(className == "option-4"){
        body.style.backgroundImage = "url(../assets/photos/option-4.jpg)"
        this.optionStatus = "option-4"
        console.log("4")
      }
      else if(className == "option-5"){
        body.style.backgroundImage = "url(../assets/photos/option-5.jpg)"
        this.optionStatus = "option-5"
        console.log("4")
      }
      else if(className == "default-option"){
        body.style.backgroundImage = "url(../assets/photos/theme_1.jpg)"
        this.optionStatus = "theme_1"
        console.log("4")
      }

    }
  }
}







