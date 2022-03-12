import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  title: string ="Sosnowiec Weather News";
  newsTitle: string = "Weather report for Sosnowiec";
  paragraph: string = "Night and day it is mostly cloudy. Almost no sunshine can be expected. Temperature highs are likely to reach 3 °C. The whole day blows a light breeze (7 to 12 km/h). From time to time gusts could reach up to 26 km/h. Winds blowing from North. The weather forecast for Sosnowiec for Tuesday is expected to be very accurate."

}
