import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {UntypedFormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "src/app/core/services/user.service";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';

import ScrollReveal from "scrollreveal";
import {ErrorService} from "../../../../core/services/error.service";
import {isUserExist, readDataFromObject, User, UserInfo} from "../../../../core/models/global-interfaces";
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { ViewChild,ElementRef } from '@angular/core'
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";


declare var FB: any;
declare const gapi: any;



@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginFormsComponent implements OnInit {
  loginFormGroup: UntypedFormGroup;

  user: SocialUser;
  loggedIn: boolean;

  constructor( private authService: SocialAuthService, private ngZone: NgZone,
              private errorService: ErrorService, private formBuilder: UntypedFormBuilder, private userService: UserService,
              private router: Router, private auth: AuthService, private weatherService: WeatherService,

  ){}



  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
    this.authService.authState.subscribe((user) => {
      if(!user){return}
      let isUserExist: boolean
      this.userService.checkFacebookUserAlreadyExists(user.email).subscribe(
        (res) => {
          isUserExist = res.condition
          if(isUserExist){
            this.auth.setToken(Math.random().toString(36).substr(2));
            this.auth.setUsername(res.username!)
            this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
            this.router.navigate(['/login/user'])
          }
          else{
            this.auth.setToken(Math.random().toString(36).substr(2));
            this.router.navigate(['/login/set-username'])
          }
        }
      )
    });
  }
  loginUser(){
    let user: User = this.loginFormGroup.value
    this.userService.loginUser(user).subscribe(
      (user) => { console.log(user) },
      () => {},
      () => {
      this.auth.setToken(Math.random().toString(36).substr(2));
      this.auth.setUsername(this.loginFormGroup.controls['username'].value)
      this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
      this.router.navigate(['/login/user'])
    })
  }
  singOut(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }
  loginWithGoogle(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com',
        fetch_basic_profile: false,
        hosted_domain: 'http://localhost:4200/login/forms',
        scope: 'openid profile email',
        plugin_name:'Web Client Google - My Weather App'
      }).then((auth2: any) => { // wait for initialisation
        console.log(!auth2.isSignedIn.get())
        if (!auth2.isSignedIn.get()) { // check if already signed in


          // auth2.refreshAuthToken()
          auth2.signIn().then(() => {this.ngZone.run(() => {
            this.authService.authState.subscribe((user) => {
              this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
              console.log("nopeeeeeeeeeeee")
              console.log(user);
            })

          })})


        }
      })
    })

    // this.router.navigate(['/login/user'])
  }
  singIn(): void{
    this.authService.signOut()
  }

}
