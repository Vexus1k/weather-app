import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, VERSION} from '@angular/core';
import {UntypedFormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "src/app/core/services/user.service";
import {Router, RouterOutlet} from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';
// import {GoogleAuthService} from "ng-gapi";
import ScrollReveal from "scrollreveal";
import {ErrorService} from "../../../../core/services/error.service";
import {isUserExist, readDataFromObject, User, UserInfo} from "../../../../core/models/global-interfaces";
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { ViewChild,ElementRef } from '@angular/core'
import {ChatService} from "../../../../core/services/chat.service";

import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {transform} from "lodash";


declare var FB: any;
declare const gapi: any;


@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginFormsComponent implements OnInit {
  loginFormGroup: UntypedFormGroup;
  userr: gapi.auth2.GoogleUser | null
  userInfo?: UserInfo
  loggedIn: boolean;


  constructor( private ngZone: NgZone,
              private errorService: ErrorService, private formBuilder: UntypedFormBuilder, private userService: UserService,
              private router: Router, private auth: AuthService, private weatherService: WeatherService,
               private signInService: ChatService,
               private ref : ChangeDetectorRef

  ){}
  ngOnInit(): void {
    this.signInService.userProfileSubject.subscribe( (info: UserInfo) => {
      console.log(info)
      this.userInfo = info
    })
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  signIn() {
    let user: User = this.loginFormGroup.value
    this.userService.loginUser(user).subscribe(
      (user) => { console.log(user) },
      () => {},
      () => {
      this.auth.setToken(Math.random().toString(36).substr(2));
      this.auth.setUsername(this.loginFormGroup.controls['username'].value)
        console.log(this.loginFormGroup.controls['username'].value)
      this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
      this.router.navigate(['/login/user'])
    })
  }
  signInWithFB(): void {
    this.errorService.setErrorStatusAndMessage("Work in progress", true)
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
    // this.authService.authState.subscribe((user) => {
    //   if(!user){return}
    //   let isUserExist: boolean
    //   console.log(user.email)
    //   this.userService.checkFacebookUserAlreadyExists(user.email).subscribe(
    //     (res) => {
    //       console.log(res)
    //       isUserExist = res.condition
    //       if(isUserExist){
    //         this.auth.setToken(Math.random().toString(36).substr(2));
    //         this.auth.setUsername(res.username!)
    //         this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
    //         this.router.navigate(['/login/user'])
    //       }
    //       else{
    //         this.auth.setToken(Math.random().toString(36).substr(2));
    //         this.router.navigate(['/login/set-username'])
    //       }
    //     }
    //   )
    // });
  }
  signInWithGoogle(): void {
    this.errorService.setErrorStatusAndMessage("Work in progress", true)
    // gapi.load('auth2', () => {
    //   gapi.client.init({
    //     clientId: '716075642837-kergfh0638hu8iq5dimpgnlc1f08s61r.apps.googleusercontent.com',
    //     scope: 'email',
    //     plugin_name: 'PLUGIN'
    //     // plugin_name: "Web Client Google - My Weather App",
    //     // hosted_domain: "http://localhost:4200",
    //     // scope: "openid profile email",
    //     // client_id: '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com',
    //     // fetch_basic_profile: false,
    //   }).then((auth2: any) => { // wait for initialisation
    //     console.log(!auth2.isSignedIn.get())
    //     if (!auth2.isSignedIn.get()) { // check if already signed in
    //       console.log("first step")
    //       // auth2.refreshAuthToken()
    //       auth2.signIn().then()
    //       this.authService.authState.subscribe((user) => {
    //         console.log("nopeeeeeeeeeeee")
    //         console.log("third step")
    //         console.log(user);
    //         this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
    //
    //       })
    //       this.ngZone.run(() => {
    //         this.authService.authState.subscribe((user) => {
    //           this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
    //           console.log("nopeeeeeeeeeeee")
    //           console.log("third step")
    //           console.log(user);
    //         })
    //
    //       })
          // auth2.signIn().then(() => {console.log("second step"); this.ngZone.run(() => {
          //   this.authService.authState.subscribe((user) => {
          //     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
          //     console.log("nopeeeeeeeeeeee")
          //     console.log("third step")
          //     console.log(user);
          //   })
          //
          // })})
    //     }
    //   })
    // })
    // this.router.navigate(['/login/user'])
  }
}
