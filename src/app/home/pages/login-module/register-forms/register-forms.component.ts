import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styleUrls: ['./register-forms.component.css',
    "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"
  ],
})
export class RegisterFormsComponent implements OnInit {
  validationPasswordMessage: string;
  registerFormGroup: FormGroup
  validationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      accountUsername: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{1,20}")]],
      accountEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      accountPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$")]]
    })
    this.validationPasswordMessage = this.checkPasswordValidation(this.registerFormGroup.controls['accountPassword'].value);

  }
  registerUser(){
    console.log("chuj")
    let user = this.registerFormGroup.value
    console.log(user)
    this.usersService.registerUser(user).subscribe(res => {
      alert("Signup successful")
      this.registerFormGroup.reset()
      this.router.navigate(['login-forms'])
    }, err => {
      alert('Something went wrong')
    })
  }
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
