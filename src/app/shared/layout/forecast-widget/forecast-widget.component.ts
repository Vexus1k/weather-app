import {Component, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.css']
})
export class ForecastWidgetComponent implements OnInit {
  @ViewChild('navigationSwiper') navigationTempSwiper: any;
  @ViewChild('mySwiper') newSwiper: any;
  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.forecast__widget', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'left',
      delay: 300
    });
  }
  navigationConfig: SwiperOptions = {
    slidesPerView: 3,
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
    breakpoints: {
      100: {
        slidesPerView: 4,

      },
      320: {
        slidesPerView: 5
      },
      576: {
        slidesPerView: 5
      },
      767: {
        slidesPerView: 5
      }
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
    breakpoints: {
      100: {
        slidesPerView: 6,

      },
      320: {
        slidesPerView: 6
      },
      576: {
        slidesPerView: 6
      },
      767: {
        slidesPerView: 7
      },
      1040: {
        slidesPerView: 7
      },
      1600: {
        slidesPerView: 7
      },
      2200: {
        slidesPerView: 8
      }

    }

  }
  onReachEndNavigationTemp(){
    if(this.navigationTempSwiper.swiperRef.isEnd){
      this.navigationTempSwiper.swiperRef.allowSlideNext = false
      this.navigationTempSwiper.swiperRef.slideTo(0)
      setTimeout(() =>this.navigationTempSwiper.swiperRef.slidePrev(), 200)
      setTimeout(() => this.navigationTempSwiper.swiperRef.allowSlideNext = true, 200)
    }
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