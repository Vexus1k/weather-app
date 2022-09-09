import {Component, NgZone, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ErrorService} from "../../../../core/services/error.service";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import { WeatherService } from 'src/app/core/services/weather.service';
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.component.html',
  styleUrls: ['./set-username.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class SetUsernameComponent implements OnInit {
  usernameFormGroup: UntypedFormGroup
  constructor(private weatherService: WeatherService, private ngZone: NgZone, private errorService: ErrorService,
              private formBuilder: UntypedFormBuilder, private userService: UserService,
              private router: Router, private auth: AuthService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.usernameFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    })
  }
  setUsername(){
    let username: string = this.usernameFormGroup.controls['username'].value
    let isUsernameFree: boolean;
    this.userService.checkUsernameExistInAllDbs(username).subscribe(
    (res)=> {
        this.ngZone.run(()=> {
            isUsernameFree = res
            console.log(isUsernameFree)
            if (isUsernameFree) {
              let userId = this.weatherService.getCookie("userId")
              let googleEmail = this.weatherService.getCookie('googleEmail')
              this.userService.isFacebookOrGoogleCall.subscribe((res) => {
                console.log(res)
                if(res == 'google'){
                  this.userService.addUserToGoogleDb({email: googleEmail!, username: username}).subscribe()
                  return
                }
                else if(res == 'facebook'){
                  this.userService.addUserToFacebookDb({userId: userId!, username: username}).subscribe()
                  return
                }
                return
                }
                )
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
