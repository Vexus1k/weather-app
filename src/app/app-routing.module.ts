import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormsComponent } from './home/pages/login-module/login-forms/login-forms.component';

import * as path from "path";
import {LoginRegisterButtonsComponent} from "./home/pages/login-module/login-register-buttons/login-register-buttons.component";
import {RegisterFormsComponent} from "./home/pages/login-module/register-forms/register-forms.component";
import { HeaderComponent } from './shared/layout/header/header.component';
import { LoginAvatarComponent } from './home/pages/login-module/login-avatar/login-avatar.component';


const routes: Routes = [
  {path: '', component: LoginRegisterButtonsComponent, pathMatch: 'full'},
  {path: 'login-forms', component: LoginFormsComponent},
  {path: 'register-forms', component: RegisterFormsComponent},
  {path: 'login-avatar', component: LoginAvatarComponent},
  {path: '**', component: LoginRegisterButtonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

