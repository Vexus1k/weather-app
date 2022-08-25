import {Component, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import {map, take} from "rxjs";
import {readDataFromObject} from "../../../../core/models/global-interfaces";


@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.css']
})
export class ForecastWidgetComponent implements OnInit {
  weatherInfo: any;
  advancedWeatherInfoObjects: any;
  hourlyWeatherInfoObjects: any;
  actuallyIdCity: string | null;

  @ViewChild('navigationSwiper') navigationTempSwiper: any;
  @ViewChild('listSwiper') listSwiper: any;

  constructor(private weatherService: WeatherService) { }


  ngOnInit(): void {
    this.actuallyIdCity = this.weatherService.getCookie("cityId")
    this.weatherService.cityId.subscribe(cityId => {
      if (cityId != this.actuallyIdCity) {
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
  getHourlyWeatherInfo(){
    this.hourlyWeatherInfoObjects = this.weatherService.getHourlyWeatherInfo().pipe(map(data => data.forecast))
  }
  getAdvancedWeatherInfo(){
    this.advancedWeatherInfoObjects = this.weatherService.getAdvancedWeatherInfo().pipe(map(data => data.forecast))
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
