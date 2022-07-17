import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css', "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],

})
export class SingUpComponent implements OnInit {
  registerFormGroup: UntypedFormGroup

  constructor() { }

  ngOnInit(): void {
    this.registerFormGroup = new UntypedFormGroup({
      accountLogin: new UntypedFormControl('',[
        Validators.required,
       ]),
      accountEmail: new UntypedFormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      accountPassword: new UntypedFormControl('',[
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
