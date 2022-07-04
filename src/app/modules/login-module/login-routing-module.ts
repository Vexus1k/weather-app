import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from "../../shared/layout/login-register/login-register.component";
import {LoginRegisterButtonsComponent} from "../../home/pages/login-register-buttons/login-register-buttons.component";
import {LoginComponent} from "../../home/pages/login/login.component";
import { SingUpComponent } from '../../home/pages/sing-up/sing-up.component';



const routes: Routes = [
  {
    path: 'forms', component: LoginRegisterComponent, children: [
      { path: 'buttons', component: LoginRegisterButtonsComponent},
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: SingUpComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
