import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginCubeSectionComponent } from './shared/layout/login-cube-section/login-cube-section.component';


const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'forecast', component: AppComponent },
  { path: 'wind', component: AppComponent },
  { path: 'precipitation', component: AppComponent },
  { path: 'sun-moon', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {'anchorScrolling': 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

