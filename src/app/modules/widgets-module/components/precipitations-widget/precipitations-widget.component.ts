import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-precipitations-widget',
  templateUrl: './precipitations-widget.component.html',
  styleUrls: ['./precipitations-widget.component.css'],

})

export class PrecipitationsWidgetComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.parameter__precipitation', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }

}
