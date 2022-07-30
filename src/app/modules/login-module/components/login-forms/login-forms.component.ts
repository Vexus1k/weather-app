import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "src/app/core/services/user.service";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';
import ScrollReveal from "scrollreveal";
import {ErrorService} from "../../../../core/services/error.service";
import {User} from "../../../../core/models/global-interfaces";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginFormsComponent implements OnInit {
  loginFormGroup: FormGroup
  constructor(private errorService: ErrorService, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/login/user'])
    }
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
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
        console.log("chuj")
    })
  }
}
