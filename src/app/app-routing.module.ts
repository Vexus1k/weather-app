import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {LoginFormsComponent} from "./modules/login-module/components/login-forms/login-forms.component";
import {RegisterFormsComponent} from "./modules/login-module/components/register-forms/register-forms.component";
import {
  LoginRegisterButtonsComponent
} from "./modules/login-module/components/login-register-buttons/login-register-buttons.component";
import {
  LoginArticleBoxComponent
} from "./modules/login-module/components/login-article-box/login-article-box.component";
import {AppComponent} from "./app.component";



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

