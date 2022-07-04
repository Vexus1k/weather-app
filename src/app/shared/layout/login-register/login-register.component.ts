import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.login__part', {
      origin: 'left',
      distance: '60px',
      delay: 300
    });
  }

}
