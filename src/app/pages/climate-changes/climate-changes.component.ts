import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-climate-changes',
  templateUrl: './climate-changes.component.html',
  styleUrls: ['./climate-changes.component.css']
})
export class ClimateChangesComponent {
  paragraph: string = "The top graph shows an estimate of the mean annual" +
    " temperature for the larger region of Sosnowiec. " +
    "The dashed blue line is the linear climate change trend." +
    " If the trend line is going up from left to right, the temperature " +
    "trend is positive and it is getting warmer in Sosnowiec due to climate change." +
    " If it is horizontal, no clear trend is seen, and if it is going down, conditions in Sosnowiec are becoming colder over time."



}
