import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ErrorService } from "../../../../core/services/error.service";
import { UserService } from "../../../../core/services/user.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css',
    "./../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})

export class ForgotPasswordComponent implements OnInit {
  validationPasswordMessage: string;
  changePasswordFormGroup: UntypedFormGroup
  validationForm: UntypedFormGroup;

  constructor(private errorService: ErrorService, private formBuilder: UntypedFormBuilder,
              private usersService: UserService, private router: Router, private auth: AuthService) {
  }
  ngOnInit(): void {
    this.changePasswordFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{1,20}")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$")]],
      secondPassword: ['', [Validators.required]]
    })
    this.validationPasswordMessage = this.checkPasswordValidation(this.changePasswordFormGroup.controls['password'].value);
  }

  changePassword(){
    let username = this.changePasswordFormGroup.value.username
    let password = this.changePasswordFormGroup.value.password
    let secondPassword = this.changePasswordFormGroup.value.secondPassword
    if(password != secondPassword){
      this.errorService.setErrorStatusAndMessage('Passwords are not the same.', false)
      return
    }
    this.usersService.changePassword(username!, password).subscribe( (res) => {
      if(res.condition) {
        this.changePasswordFormGroup.reset()
        this.errorService.setErrorStatusAndMessage('Password was changed successfully.', true)
        this.router.navigate(['/login/forms'])
        return
      }
      if(res.message){
        this.errorService.setErrorStatusAndMessage(res.message, false)
        return
      }
      this.errorService.setErrorStatusAndMessage('Username does not exist.', false)
    })
  }

  checkPasswordValidation(password: string){
    return this.usersService.checkPasswordValidation(password)
  }
}
