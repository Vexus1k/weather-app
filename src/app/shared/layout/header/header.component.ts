import {Component, OnInit} from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
    ScrollReveal().reveal('.header', {
      distance: '60px',
      easing: 'ease-in-out',
      origin: 'top',
      delay: 300
    });
  }

}
