import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../weather.service";
import {Observable} from "rxjs";
import {LooseObject} from "../../models/global-interfaces";

declare function setSwitchesToSetWindSpeed(windIndex: number): string;
declare function setSwitchesToSetCloudy(cloudIndex: number): string;
declare function sendEmail(): void;
declare function takeButtonValue(): void;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})



export class NewsComponent implements OnInit{
  temp: number;
  title: string ="Sosnowiec Weather";
  newsTitle: string = "Weather Article and News in Sosnowiec";
  windSpeedIndex: number;
  windInfo: string;
  cloudyCoverIndex: number;
  cloudyCoverInfo: string;
  strDate: Date = new Date();
  f: any;


  constructor(private weather: WeatherService) {

  }
  ngOnInit() {


    // setTimeout(()=>{console.log(this.temp = this.weather.getWeather())}, 5000)
    this.weather.getWeather().subscribe((data: LooseObject) => {this.temp = data.dataseries[0].temp2m});
    this.weather.getWeather().subscribe((data: LooseObject) => { this.windSpeedIndex = data.dataseries[0].wind10m.speed});  //get wind speed index to get parameter
    this.weather.getWeather().subscribe((data: LooseObject) => { this.cloudyCoverIndex = data.dataseries[0].cloudcover}); //get cloud cover index to get parameter

    setInterval(()=>{this.windInfo = setSwitchesToSetWindSpeed(this.windSpeedIndex);}, 500)
    setInterval(()=>{this.cloudyCoverInfo = setSwitchesToSetCloudy(this.cloudyCoverIndex);}, 500)
    clearInterval()



  }
  show(): void{
    this.weather.sendMail().subscribe()
  }
}

