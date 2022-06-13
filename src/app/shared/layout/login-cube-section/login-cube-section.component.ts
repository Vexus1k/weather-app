import { Component, OnInit } from '@angular/core';
import {SwiperOptions} from "swiper";

@Component({
  selector: 'app-login-cube-section',
  templateUrl: './login-cube-section.component.html',
  styleUrls: ['./login-cube-section.component.css']
})
export class LoginCubeSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cubeConfig: SwiperOptions = {
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false
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
}
