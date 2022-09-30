import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { UserService} from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../../core/models/global-interfaces";
import { ErrorService } from "../../../../core/services/error.service";

@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styleUrls: ['./register-forms.component.css',
    "./../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"
  ],
})

export class RegisterFormsComponent implements OnInit {
  validationPasswordMessage: string;
  registerFormGroup: UntypedFormGroup
  validationForm: UntypedFormGroup;

  constructor(private errorService: ErrorService, private formBuilder: UntypedFormBuilder,
              private usersService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{1,20}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$")]]
    })
    this.validationPasswordMessage = this.checkPasswordValidation(this.registerFormGroup.controls['password'].value);
  }

  registerUser(){
    let user: User = this.registerFormGroup.value
    this.usersService.checkUsernameExistInAllDbs(user.username).subscribe( (res) => {
      if(res){
        this.usersService.registerUser(user).subscribe((res) => {
          if(res){
            this.errorService.setErrorStatusAndMessage('Account has been created.', true)
            this.registerFormGroup.reset()
            this.router.navigate(['/login/forms'])
            return
          }
          this.errorService.setErrorStatusAndMessage('Email is currently in use.', false)
        })
        return
      }
      this.errorService.setErrorStatusAndMessage("Username is currently in use.", false)
    })
  }

  checkPasswordValidation(password: string){
    return this.usersService.checkPasswordValidation(password)
  }
}
