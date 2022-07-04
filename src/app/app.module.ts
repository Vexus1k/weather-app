import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SwiperModule} from "swiper/angular";
import {HeaderComponent} from "./shared/layout/header/header.component";
import { CubeSwiperComponent } from './shared/layout/cube-swiper/cube-swiper.component';
import { ForecastWidgetComponent } from './shared/layout/forecast-widget/forecast-widget.component';
import { WindWidgetComponent } from './shared/layout/wind-widget/wind-widget.component';
import { PrecipitationsWidgetComponent } from './shared/layout/precipitations-widget/precipitations-widget.component';
import { SunMoonWidgetComponent } from './shared/layout/sun-moon-widget/sun-moon-widget.component';

import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION, SPINNER
} from "ngx-ui-loader";
import { ScrollUpThemeSwitcherComponent } from './shared/layout/scroll-up-theme-switcher/scroll-up-theme-switcher.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LoginRegisterComponent } from './shared/layout/login-register/login-register.component';
import {LoginModule} from "./modules/login-module/login.module";
import {LoginRegisterButtonsComponent} from "./home/pages/login-register-buttons/login-register-buttons.component";

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
    AppComponent,
    HeaderComponent,
    CubeSwiperComponent,
    ForecastWidgetComponent,
    WindWidgetComponent,
    PrecipitationsWidgetComponent,
    SunMoonWidgetComponent,
    ScrollUpThemeSwitcherComponent,
    LoginRegisterComponent
  ],
  imports: [
    LoginModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwiperModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
