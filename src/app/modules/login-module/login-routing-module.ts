import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormsComponent} from "./components/register-forms/register-forms.component";
import {LoginFormsComponent} from "./components/login-forms/login-forms.component";
import {LoginRegisterButtonsComponent} from "./components/login-register-buttons/login-register-buttons.component";
import {LoginArticleComponent} from "./components/login-article/login-article.component";
import { LoginAvatarComponent } from './components/login-avatar/login-avatar.component';



const routes: Routes = [
  {path: 'home', component: LoginArticleComponent, children: [
      {path: '', component: LoginRegisterButtonsComponent},
      {path: 'login-forms', component: LoginFormsComponent},
      {path: 'register-forms', component: RegisterFormsComponent},
      {path: 'login-avatar', component: LoginAvatarComponent},
      { path: "**", redirectTo: '' }
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
