import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormsComponent} from "./components/login-forms/login-forms.component";
import {RegisterFormsComponent} from "./components/register-forms/register-forms.component";
import {LoginRegisterButtonsComponent} from "./components/login-register-buttons/login-register-buttons.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SwiperModule} from "swiper/angular";

import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {LoginRoutingModule} from "./login-routing-module";
import {LoginArticleBoxComponent} from "./components/login-article-box/login-article-box.component";
import {WidgetModule} from "../widgets-module/widget.module";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    LoginFormsComponent,
    RegisterFormsComponent,
    LoginRegisterButtonsComponent,
    LoginUserComponent,
    LoginArticleBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoginRoutingModule,
    WidgetModule,
  ],
  exports: [
    LoginRegisterButtonsComponent,
    LoginArticleBoxComponent
  ]
})
export class LoginModule { }
