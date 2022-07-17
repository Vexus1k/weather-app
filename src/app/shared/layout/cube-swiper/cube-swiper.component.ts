import {AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {SwiperOptions} from "swiper";
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-cube-swiper',
  templateUrl: './cube-swiper.component.html',
  styleUrls: ['./cube-swiper.component.css']
})
export class CubeSwiperComponent implements OnInit{
  weatherInfo: any;
  weatherStatusTitle: string;
  disableSendButton: boolean = true;
  button: HTMLElement | null;
  emailFormGroup: UntypedFormGroup;

  @ViewChild('cubeSwiper')cubeSwiper: any;
  constructor(private weatherService: WeatherService, private formBuilder: UntypedFormBuilder) { }


  ngOnInit(): void {

    // this.weatherService.getWeatherInfo().subscribe(result =>
    //   { this.weatherInfo = result; this.weatherStatusTitle = this.weatherInfo[0].weather[0].description }
    // )


    this.emailFormGroup = new UntypedFormGroup({
      newsletterEmail: new UntypedFormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
    ScrollReveal().reveal('.parameter__part', {
      rotate: {
        x: 20,
        z: 20
      },

      delay: 300,
      origin: 'right',
      distance: '60px',

    });
  }
  get primEmail(){
    return this.emailFormGroup.get('newsletterEmail')
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
  startTuringAroundAndCheckActiveButton(){
    this.button = document.getElementById('btn1');
    if((this.primEmail?.invalid && this.primEmail?.touched) || (this.primEmail?.dirty && this.primEmail?.invalid)){
      if(this.button?.classList.contains('btnColor')){
        this.button?.classList.remove('btnColor')
      }
      this.disableSendButton = true;
      this.cubeSwiper.swiperRef.autoplay.stop();
    }
    else if(this.primEmail?.valid){
      if(!this.button?.classList.contains('btnColor')){
        this.button?.classList.add('btnColor')
      }
      this.disableSendButton = false;
    }
    else{
      if(this.button?.classList.contains('btnColor')){
        this.button?.classList.remove('btnColor')
      }
      this.disableSendButton = true;
      this.cubeSwiper.swiperRef.autoplay.start()
    }
  }
  sendEmail(){
    let email = this.primEmail?.value
    this.weatherService.sendMail(email).subscribe()
    this.emailFormGroup.reset()
  }
}
