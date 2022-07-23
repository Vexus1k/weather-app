import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.css']
})
export class WindWidgetComponent implements OnInit {
  windmillIconPath: string = "../../../../../assets/photos/windmill.png";
  constructor() { }

  ngOnInit(): void {

    ScrollReveal().reveal('.parameter__wind', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'right',
      delay: 300
    });
  }

}
