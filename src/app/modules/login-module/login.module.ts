import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../../home/pages/login/login.component";
import {SingUpComponent} from "../../home/pages/sing-up/sing-up.component";
import {LoginRegisterButtonsComponent} from "../../home/pages/login-register-buttons/login-register-buttons.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent,
    SingUpComponent,
    LoginRegisterButtonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    LoginRegisterButtonsComponent
  ],
  bootstrap: [SingUpComponent]
})
export class LoginModule { }
