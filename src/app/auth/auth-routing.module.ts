import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: null,
    children: [
      {
        path: 'login',
        component: null
      },
      {
        path: 'reset-password',
        component: null
      },
      {
        path: 'set-password/:hasCode',
        component: null
      },
      {
        path: 'logout',
        component: null
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
