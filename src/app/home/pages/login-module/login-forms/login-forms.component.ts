import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css', "../../../../../../node_modules/angular-bootstrap-md/assets/scss/bootstrap/bootstrap.scss"]
})
export class LoginFormsComponent implements OnInit {
  loginFormGroup: FormGroup
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      accountUsername: ['', Validators.required],
      accountPassword: ['', Validators.required]
    })
  }
  loginUser(){
    this.userService.getLoginUsersList().subscribe(res => {
      const user = res.find((a: any)=>{

        return a.username === this.loginFormGroup.value.username && a.password === this.loginFormGroup.value.password
      })
      if(user){
        this.userService.sendCurrentlyUserUsername(this.loginFormGroup.controls['accountUsername'].value)
        alert("Login Success")
        this.loginFormGroup.reset()
        this.router.navigate(['/login-avatar'])
      }else{
        alert("User not found")
      }
    }, err => {
      alert("Something went wrong")
    })
  }
}
