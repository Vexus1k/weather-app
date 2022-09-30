import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from "../../../../core/services/error.service";
import {
  User
} from "../../../../core/models/global-interfaces";
import { WeatherService } from 'src/app/core/services/weather.service';
import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})

export class LoginFormsComponent implements OnInit {
  loginFormGroup: UntypedFormGroup;
  user: any;

  constructor( private ngZone: NgZone,
              private errorService: ErrorService, private formBuilder: UntypedFormBuilder, private userService: UserService,
              private router: Router, private auth: AuthService, private weatherService: WeatherService,
               private authService: SocialAuthService
  ){}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signIn() {
    let user: User = this.loginFormGroup.value
    this.userService.loginUser(user).subscribe(
      () => {  },
      () => {},
      () => {
      this.auth.setToken(Math.random().toString(36).substr(2));
      this.auth.setUsername(this.loginFormGroup.controls['username'].value)
      this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
      this.router.navigate(['/login/user'])
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( () => {
      this.userService.checkFacebookUserAlreadyExists(this.user.email).subscribe( (res) => {
        let isUserExist: boolean = res.condition
        if(isUserExist){
          this.auth.setFacebookToken(Math.random().toString(36).substr(2));
          this.auth.setToken(Math.random().toString(36).substr(2));
          this.auth.setUsername(res.username!)
          this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
          this.router.navigate(['/login/user'])
          return
        }
        this.auth.setFacebookToken(Math.random().toString(36).substr(2))
        this.userService.setIsFacebookOrGoogleCall('facebook')
        this.router.navigate(['/login/set-username']).then()
        this.errorService.setErrorStatusAndMessage("Set your nickname.", true)
      })
    });
  }

  signInWithGoogle(): void {
    this.errorService.setErrorStatusAndMessage("Work in progress", true)
  }
}
