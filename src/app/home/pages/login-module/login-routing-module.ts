import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterButtonsComponent} from "./login-register-buttons/login-register-buttons.component";
import {LoginFormsComponent} from "./login-forms/login-forms.component";
import { RegisterFormsComponent } from './register-forms/register-forms.component';



const routes: Routes = [
  {path: '', component: LoginRegisterButtonsComponent, pathMatch: 'full'},
  {path: 'login-forms', component: LoginFormsComponent},
  {path: 'register-forms', component: RegisterFormsComponent},
  {path: '**', component: LoginRegisterButtonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
