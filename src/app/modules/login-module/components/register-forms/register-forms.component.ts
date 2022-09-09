import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "src/app/core/services/user.service";
import {Router} from "@angular/router";
import ScrollReveal from "scrollreveal";
import {User} from "../../../../core/models/global-interfaces";
import {map} from "rxjs/operators";
import {ErrorService} from "../../../../core/services/error.service";


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

  constructor(private errorService: ErrorService, private formBuilder: UntypedFormBuilder, private usersService: UserService, private router: Router) {
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
    this.usersService.registerUser(user).subscribe(
  (user) => { console.log(user) },
  () => {},
  () => {
    this.errorService.setErrorStatusAndMessage('Account has been created.', true)
    this.registerFormGroup.reset()
    this.router.navigate(['/login/forms'])
  })}
  checkPasswordValidation(value: string) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
      return "Must not contain whitespaces.";
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "One uppercase character.";
    }
    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
      return "One lowercase character.";
    }
    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
      return "One digit.";
    }
    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
      return "8-16 Characters Long.";
    }
    return ""
  }
}
