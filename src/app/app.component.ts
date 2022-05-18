import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeatherService} from "./weather.service";
import {filter, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {formatNumber} from "@angular/common";
import {stringify} from "flatted";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather-app';
  weatherDiagram: string = "";


  constructor(private weather: WeatherService) {
  }

  ngOnInit() {
    this.weatherDiagram = this.weather.getWeatherDiagram();
    this.weather.getWeather();

  }

}






