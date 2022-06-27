import {AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-login-cube-section',
  templateUrl: './login-cube-section.component.html',
  styleUrls: ['./login-cube-section.component.css']
})
export class LoginCubeSectionComponent implements OnInit{
  inputValue: string = '';
  @ViewChild('cubeSwiper')cubeSwiper: any;
  constructor(private weatherService: WeatherService) { }


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
    if(this.inputValue != ''){
      this.cubeSwiper.swiperRef.autoplay.stop();
    }
    else{
      this.cubeSwiper.swiperRef.autoplay.start();
    }
  }
  sendEmail(email: string){
    console.log(email)
    let mail = {email}
    this.weatherService.sendMail(mail).subscribe()
    this.inputValue = ''
  }
}
