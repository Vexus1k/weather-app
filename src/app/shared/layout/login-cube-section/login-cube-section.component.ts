import {Component, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-login-cube-section',
  templateUrl: './login-cube-section.component.html',
  styleUrls: ['./login-cube-section.component.css']
})
export class LoginCubeSectionComponent implements OnInit {
  @ViewChild('cubeSwiper')cubeSwiper: any;
  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.parameter__part', {
      rotate: {
        x: 20,
        z: 20
      },

      delay: 300,
      origin: 'right',
      distance: '60px',

    });
    ScrollReveal().reveal('.parameter__login', {
      origin: 'left',
      distance: '60px',

      delay: 300
    });
  }
  cubeConfig: SwiperOptions = {
    autoplay: {
      delay: 5000,
    },
    slidesPerView: "auto",
    watchOverflow: true,
    pagination: {
      type: "bullets",
      dynamicBullets: true,

    },
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
    },

  };
  stopTuringAround(){
    this.cubeSwiper.swiperRef.autoplay.stop();
  }
  startTuringAround(){
    this.cubeSwiper.swiperRef.autoplay.start();
  }
}
