import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";
import { WeatherService } from 'src/app/core/services/weather.service';
import {readDataFromObject} from "../../../../core/models/global-interfaces";
import {take} from "rxjs";

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.css']
})
export class WindWidgetComponent implements OnInit {
  windmillIconPath: string = "../../../../../assets/photos/windmill.png";
  generalWeatherInfoObject: readDataFromObject;
  actuallyIdCity: string | null;

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.actuallyIdCity = this.weatherService.getCookie("cityId")
    this.weatherService.cityId.subscribe(cityId => {
      if (cityId != this.actuallyIdCity) {
        this.getGeneralWeatherInfo()
      }
    })
    this.getGeneralWeatherInfo()
    ScrollReveal().reveal('.parameter__wind', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'right',
      delay: 300
    });
  }
  getGeneralWeatherInfo(){
    setTimeout(()=> this.weatherService.getGeneralWeatherInfo().pipe(take(1)).subscribe((res)=>
      {
        console.log(res)
        this.generalWeatherInfoObject = res.current
      }
    ), 4000)

  }
}
