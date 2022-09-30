import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ErrorService } from "../../../../core/services/error.service";
import { UserService } from "../../../../core/services/user.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { WeatherService } from 'src/app/core/services/weather.service';
import { SocialAuthService } from "angularx-social-login";
import { userFacebookDb } from "../../../../core/models/global-interfaces";

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.component.html',
  styleUrls: ['./set-username.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})

export class SetUsernameComponent implements OnInit {
  usernameFormGroup: UntypedFormGroup
  user: any;
  loggedIn!: boolean;

  constructor(private weatherService: WeatherService, private ngZone: NgZone, private errorService: ErrorService,
              private formBuilder: UntypedFormBuilder, private userService: UserService,
              private router: Router, private auth: AuthService, private authService: SocialAuthService)
  { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = user != null;
    });
    this.usernameFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    })
  }

  setUsername(){
    let username: string = this.usernameFormGroup.controls['username'].value
    let isUsernameReadyToUse: boolean;
    this.userService.checkUsernameExistInAllDbs(username).subscribe(
    (res)=> {
        this.ngZone.run(()=> {
          isUsernameReadyToUse = res
            if (isUsernameReadyToUse) {
              this.userService.isFacebookOrGoogleCall.subscribe((res) => {
                if(res == 'facebook'){
                  let user: userFacebookDb = {
                    userId: String(this.user.id),
                    username: String(username),
                    email: String(this.user.email),
                    firstName: String(this.user.firstName),
                    lastName: String(this.user.lastName)
                  }
                  this.userService.addUserToFacebookDb(user).subscribe()
                  return
                }
              })
              this.auth.setFacebookToken(Math.random().toString(36).substr(2));
              this.auth.setToken(Math.random().toString(36).substr(2));
              this.usernameFormGroup.reset()
              this.auth.setUsername(username)
              this.errorService.setErrorStatusAndMessage('Login Successfully.', true)
              this.router.navigate(['/login/user'])
            } else {
              this.errorService.setErrorStatusAndMessage('Username already exist.', false)
            }
          }
        )
      }
    )
  }

  logout(){
    this.auth.logout()
  }
}
