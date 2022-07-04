import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './home/pages/login/login.component';
import {LoginRegisterComponent} from "./shared/layout/login-register/login-register.component";
import * as path from "path";
import {LoginRegisterButtonsComponent} from "./home/pages/login-register-buttons/login-register-buttons.component";
import {SingUpComponent} from "./home/pages/sing-up/sing-up.component";
import { HeaderComponent } from './shared/layout/header/header.component';


const routes: Routes = [
  {path: '', component: LoginRegisterButtonsComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SingUpComponent},
  {path: '**', component: LoginRegisterButtonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

