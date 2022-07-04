import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css', "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],

})
export class SingUpComponent implements OnInit {
  registerFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      accountLogin: new FormControl('',[
        Validators.required,
       ]),
      accountEmail: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      accountPassword: new FormControl('',[
        Validators.required,
      ]),
    });
  }
  get accountLogin(){
    return this.registerFormGroup.get('accountLogin')
  }
  get accountEmail(){
    return this.registerFormGroup.get('accountEmail')
  }
  get accountPassword(){
    return this.registerFormGroup.get('accountPassword')
  }
}
