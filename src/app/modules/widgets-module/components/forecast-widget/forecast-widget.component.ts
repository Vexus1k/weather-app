import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import { map } from "rxjs/operators";
import { readDataFromObject } from "../../../../core/models/global-interfaces";

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.css']
})

export class ForecastWidgetComponent implements OnInit {
  dayOfWeek: string;
  weatherInfo: any;
  advancedWeatherInfoObjects: any;
  hourlyWeatherInfoObjects: any;
  actuallyIdCity: string | null;
  weatherIcons: readDataFromObject;

  @ViewChild('navigationSwiper') navigationTempSwiper: any;
  @ViewChild('listSwiper') listSwiper: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.actuallyIdCity = this.weatherService.getCookie("cityId")
    this.weatherService.cityId.subscribe(cityId => {
      if (cityId != this.actuallyIdCity) {
        this.actuallyIdCity = this.weatherService.getCookie("cityId")
        this.getHourlyWeatherInfo()
        this.getAdvancedWeatherInfo()
      }
    })
    this.getHourlyWeatherInfo()
    this.getAdvancedWeatherInfo()
    ScrollReveal().reveal('.forecast__widget', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'left',
      delay: 300
    });
  }

  navigationConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',

    }
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

  getWeatherIconFromStatusCode(statusCode: string){
    let actuallyTime: string = String(new Date().getTime());
    let sunsetTime: string | null;
    this.weatherService.sunsetTime.subscribe((res) => {
      sunsetTime = res
    })
    let iconSun: string = "../../../../../assets/photos/icon-sun.svg";
    let iconMoon: string = "../../../../../assets/photos/icon-moon.svg";
    let iconSnow: string = "../../../../../assets/photos/icon-snow.svg";
    let iconSnowNight: string = "../../../../../assets/photos/icon-snow-night.svg";
    let iconPartlyCloudy: string = "../../../../../assets/photos/icon-partly-cloud.svg";
    let iconCloudyNight: string = "../../../../../assets/photos/icon-cloudy-night.svg";
    let iconCloud: string = "../../../../../assets/photos/icon-cloud.svg";
    let iconFog: string = "../../../../../assets/photos/icon-fog.svg";
    let iconFogNight: string = "../../../../../assets/photos/icon-fog-night.svg";
    let iconRain: string = "../../../../../assets/photos/icon-rain.svg";
    let iconStorm: string = "../../../../../assets/photos/icon-storm.svg";
    let iconStormyNight: string = "../../../../../assets/photos/icon-stormy-night.svg";
    switch (statusCode){
      case '0':{
        if(actuallyTime < sunsetTime!){
          return iconSun
        }
        else{
          return iconMoon
        }
      }
      case '1':{
        return iconPartlyCloudy
      }
      case '2':{
        if(actuallyTime < sunsetTime!){
          return iconStorm
        }
        else{
          return iconStormyNight
        }
      }
      case '3':{
        return iconRain
      }
      case '4': {
        if(actuallyTime < sunsetTime!){
          return iconCloud
        }
        else{
          return iconCloudyNight
        }
      }
      case '5':{
        return iconRain
      }
      case '6':{
        if(actuallyTime < sunsetTime!){
          return iconSnow
        }
        else{
          return iconSnowNight
        }
      }
      case '7':{
        if(actuallyTime < sunsetTime!){
          return iconFog
        }
        else{
          return iconFogNight
        }
      }

    }
    return 0
  }

  getHourlyWeatherInfo(){
    //I have had to set this timeout there because of API limit request per second
    setTimeout(()=>this.hourlyWeatherInfoObjects = this.weatherService.getHourlyWeatherInfo().pipe(
      map(data => data.forecast)
    ), 3000)

  }

  getAdvancedWeatherInfo(){
    //I have had to set this timeout there because of API limit request per second
    setTimeout(()=> this.advancedWeatherInfoObjects = this.weatherService.getAdvancedWeatherInfo().pipe(
      map(data => data.forecast)
    ), 3000)

  }

  getDayOfWeek(date: string) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  onReachEndNavigationSwiper(){
    if(this.navigationTempSwiper.swiperRef.isEnd){
      this.navigationTempSwiper.swiperRef.allowSlideNext = false
      this.navigationTempSwiper.swiperRef.slideTo(0)
      setTimeout(() =>this.navigationTempSwiper.swiperRef.slidePrev(), 200)
      setTimeout(() => this.navigationTempSwiper.swiperRef.allowSlideNext = true, 200)
    }
  }

  onReachEndListSwiper(){
    if (this.listSwiper.swiperRef.isEnd) {
      this.listSwiper.swiperRef.allowSlideNext = false
      this.listSwiper.swiperRef.slideTo(0)
      setTimeout(() =>this.listSwiper.swiperRef.slidePrev(), 200)
      setTimeout(() =>this.listSwiper.swiperRef.allowSlideNext = true, 200)
    }
  }
}
