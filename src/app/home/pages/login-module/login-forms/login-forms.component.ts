import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../core/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginFormsComponent implements OnInit {
  loginFormGroup: FormGroup
  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      accountUsername: ['', Validators.required],
      accountPassword: ['', Validators.required]
    })
  }
  loginUser(){
    this.usersService.getLoginUsersList().subscribe(res => {
      const user = res.find((a: any)=>{
        return a.username === this.loginFormGroup.value.username && a.password === this.loginFormGroup.value.password
      })
      if(user){
        alert("Login Success")
        this.loginFormGroup.reset()
        this.router.navigate(['/'])
      }else{
        alert("User not found")
      }
    }, err => {
      alert("Something went wrong")
    })
  }
}
