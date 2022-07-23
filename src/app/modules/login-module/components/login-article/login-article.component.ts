import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";

@Component({
  selector: 'app-login-article',
  templateUrl: './login-article.component.html',
  styleUrls: ['./login-article.component.css']
})
export class LoginArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ScrollReveal().reveal('.login__article', {
      delay: 300,
      scale: 1.4,
      origin: "left",
      distance: "60px"
    });
  }

}
