import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormsComponent} from "./components/register-forms/register-forms.component";
import {LoginFormsComponent} from "./components/login-forms/login-forms.component";
import {LoginRegisterButtonsComponent} from "./components/login-register-buttons/login-register-buttons.component";
import {LoginArticleBoxComponent} from "./components/login-article-box/login-article-box.component";
import { LoginUserComponent } from './components/login-user/login-user.component';
import {AuthGuard} from "../../core/guards/auth.guard";
import {SetUsernameComponent} from "./components/set-username/set-username.component";
import {SocialAuthGuard} from "../../core/guards/auth-social-guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";


const routes: Routes = [
  {path: 'login', component: LoginArticleBoxComponent,  children: [
      {path: '', redirectTo: '/login/buttons', pathMatch: 'full'},
      {path: 'user', canActivate: [AuthGuard], component: LoginUserComponent},
      {path: 'set-username', canActivate: [SocialAuthGuard], component: SetUsernameComponent},
      {path: 'buttons', component: LoginRegisterButtonsComponent},
      {path: 'forms', component: LoginFormsComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: '**', redirectTo: '/login/buttons'}
    ]},
  {path: 'register',component: LoginArticleBoxComponent, children: [
      {path: '', redirectTo: '/login/buttons', pathMatch: 'full'},
      {path: 'forms', component: RegisterFormsComponent},
      {path: '**', redirectTo: '/login/buttons'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
