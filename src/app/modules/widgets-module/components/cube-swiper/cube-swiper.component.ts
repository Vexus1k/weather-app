import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { EmailService } from "../../../../core/services/email.service";
import { ErrorService } from "../../../../core/services/error.service";
import { readDataFromObject } from "../../../../core/models/global-interfaces";

@Component({
  selector: 'app-cube-swiper',
  templateUrl: './cube-swiper.component.html',
  styleUrls: ['./cube-swiper.component.css']
})

export class CubeSwiperComponent implements OnInit{
  weatherInfo: any;
  weatherStatusTitle: string;
  button: HTMLElement | null;
  newsletterEmailFormGroup: UntypedFormGroup;
  advancedWeatherInfoObject: readDataFromObject;
  generalWeatherInfoObject: readDataFromObject;
  actuallyIdCity: string | null;
  dayPartName: string;

  @ViewChild('cubeSwiper')cubeSwiper: any;
  constructor(private errorService: ErrorService, private email: EmailService, private formBuilder: UntypedFormBuilder, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.actuallyIdCity = this.weatherService.getCookie("cityId")
    this.weatherService.cityId.subscribe(cityId => {
      if (cityId != this.actuallyIdCity) {
        this.getAdvancedWeatherInfo()
        this.getGeneralWeatherInfo()
      }
    })
    this.getAdvancedWeatherInfo()
    this.getGeneralWeatherInfo()
    this.initializeDayPart()
    this.newsletterEmailFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
    ScrollReveal().reveal('.swiper__cube-article', {
      delay: 300,
      scale: 1.4,
      origin: "right",
      distance: "60px"

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

  getAdvancedWeatherInfo(){
    //I have had to set this timeout there because of API limit request per second
    setTimeout(() => {
      this.weatherService.getAdvancedWeatherInfo().subscribe((res) => {
        this.advancedWeatherInfoObject = res.forecast[0]
      })
    }, 3000)
  }

  getGeneralWeatherInfo(){
    //I have had to set this timeout there because of API limit request per second
    setTimeout(() => {
      this.weatherService.getGeneralWeatherInfo().subscribe((res) => {
        this.generalWeatherInfoObject = res.current
      }
      );
    }, 1000)
  }

  stopTuringAround(){
    this.cubeSwiper.swiperRef.autoplay.stop();
  }

  startTuringSwiper(){
    if(this.newsletterEmailFormGroup.controls['email'].value === null || this.newsletterEmailFormGroup.controls['email'].value === ''){
      this.cubeSwiper.swiperRef.autoplay.start();
    }
    if((this.newsletterEmailFormGroup.controls['email'].invalid && this.newsletterEmailFormGroup.controls['email'].touched) || (this.newsletterEmailFormGroup.controls['email'].dirty && this.newsletterEmailFormGroup.controls['email'].invalid)){
      this.cubeSwiper.swiperRef.autoplay.stop();
    }
  }

  sendEmail(){
    let email = this.newsletterEmailFormGroup.value
    this.email.sendMail(email).subscribe( () => {
    }, ()=>{}, ()=>{this.errorService.setErrorStatusAndMessage('Email was sent.', true)})
    this.newsletterEmailFormGroup.reset()
  }

  initializeDayPart(){
    this.weatherService.currentTime.subscribe((res) => {
      let currentHour
      if(Number(res![0]) === 0){
        currentHour = res![1]
      }
      else{
        currentHour = res![0] + res![1]
      }
      if(Number(currentHour) >= 4 && Number(currentHour) <= 11){
        this.dayPartName = "Morning"
      }
      else if(Number(currentHour) >= 12 && Number(currentHour) <= 16){
        this.dayPartName = "Afternoon"
      }
      else if(Number(currentHour) >= 17 && Number(currentHour) <= 20){
        this.dayPartName = "Evening"
      }
      else if(Number(currentHour) >= 21 || Number(currentHour) <= 3){
        this.dayPartName = "Night"
      }
    })
  }
}
