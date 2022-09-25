import { Component, OnInit } from '@angular/core';
import ScrollReveal from "scrollreveal";
import {ChatService} from "../../../../core/services/chat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-forms-register-buttons',
  templateUrl: './login-register-buttons.component.html',
  styleUrls: ['./login-register-buttons.component.css']
})
export class LoginRegisterButtonsComponent implements OnInit {

  constructor(private googleSignUpService: ChatService, router: Router) {
    console.log("2222", googleSignUpService.isLoggedIn())
    if(googleSignUpService.isLoggedIn()){
      console.log("1111", googleSignUpService.isLoggedIn())
      router.navigate(['/login/user']).then()
    }
  }

  ngOnInit(): void {

  }

}
