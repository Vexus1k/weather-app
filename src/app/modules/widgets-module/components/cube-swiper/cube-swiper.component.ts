import {AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import {FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../../../core/services/email.service";
import {ErrorService} from "../../../../core/services/error.service";


@Component({
  selector: 'app-cube-swiper',
  templateUrl: './cube-swiper.component.html',
  styleUrls: ['./cube-swiper.component.css']
})
export class CubeSwiperComponent implements OnInit{
  weatherInfo: any;
  weatherStatusTitle: string;
  button: HTMLElement | null;
  newsletterEmailFormGroup: FormGroup;

  @ViewChild('cubeSwiper')cubeSwiper: any;
  constructor(private errorService: ErrorService, private email: EmailService, private formBuilder: UntypedFormBuilder) { }


  ngOnInit(): void {

    // this.weatherService.getWeatherInfo().subscribe(result =>
    //   { this.weatherInfo = result; this.weatherStatusTitle = this.weatherInfo[0].weather[0].description }
    // )


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
  test(){
    console.log(this.newsletterEmailFormGroup.controls['email'].value)
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
}
