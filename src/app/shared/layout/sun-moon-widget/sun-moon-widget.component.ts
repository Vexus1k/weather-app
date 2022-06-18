import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-sun-moon-widget',
  templateUrl: './sun-moon-widget.component.html',
  styleUrls: ['./sun-moon-widget.component.css']
})
export class SunMoonWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.parameter__soon-moon', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'bottom',
      delay: 300
    });
  }

}
