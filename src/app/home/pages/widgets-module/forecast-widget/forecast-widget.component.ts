import {Component, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import {AxiosResponse} from "axios";
import {WeatherInfoDays} from "../../../../core/models/global-interfaces";

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.css']
})
export class ForecastWidgetComponent implements OnInit {
  weatherInfo: any;
  w: any;
  @ViewChild('navigationSwiper') navigationTempSwiper: any;
  @ViewChild('mySwiper') newSwiper: any;
  constructor(private weatherService: WeatherService) { }


  ngOnInit(): void {
    ScrollReveal().reveal('.forecast__widget', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'left',
      delay: 300
    });
    // this.weatherService.getWeatherInfo().subscribe(result =>
    //   { this.weatherInfo = result; this.w = this.weatherInfo[0].weather[0] }
    // )
  }
  navigationConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',

    },
    on: {
      reachEnd: function () {
        console.log("chuj")
      },
      slideChange: function () {
        console.log("chuj")
      }
    },
  };
  temperatureListConfig: SwiperOptions = {
    init: false,
    direction: "vertical",
    slidesPerView: 6,
    initialSlide: 0,
    watchOverflow: true,
    scrollbar: {
      draggable: true,
      hide: true
    },

    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true,
    },
    speed: 350,
    freeMode: true,

    navigation: {
      nextEl: '.arrow',
      prevEl: null
    },

  }
  onReachEndNavigationSwiper(){
    if(this.navigationTempSwiper.swiperRef.isEnd){
      this.navigationTempSwiper.swiperRef.allowSlideNext = false
      this.navigationTempSwiper.swiperRef.slideTo(0)
      setTimeout(() =>this.navigationTempSwiper.swiperRef.slidePrev(), 200)
      setTimeout(() => this.navigationTempSwiper.swiperRef.allowSlideNext = true, 200)
    }
    console.log(this.w, this.weatherInfo)
  }
  onReachEnd(){
    if (this.newSwiper.swiperRef.isEnd) {
      this.newSwiper.swiperRef.allowSlideNext = false
      this.newSwiper.swiperRef.slideTo(0)
      setTimeout(() =>this.newSwiper.swiperRef.slidePrev(), 200)
      setTimeout(() =>this.newSwiper.swiperRef.allowSlideNext = true, 200)
    }
  }
}
