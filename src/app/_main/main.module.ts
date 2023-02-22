import { NgModule } from "@angular/core";
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { CommonModule } from "@angular/common";
import { CoreModule } from "../core/core.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ]
})
export class MainModule {

}
