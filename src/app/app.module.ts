import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SwiperModule} from "swiper/angular";
import {HeaderComponent} from "./shared/layout/header/header.component";
import { CubeSwiperComponent } from './shared/layout/cube-swiper/cube-swiper.component';
import { ScrollUpThemeSwitcherComponent } from './shared/layout/scroll-up-theme-switcher/scroll-up-theme-switcher.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginModule} from "./home/pages/login-module/login.module";
import {WidgetModule} from "./home/pages/widgets-module/widget.module";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CubeSwiperComponent,
    ScrollUpThemeSwitcherComponent
  ],
  imports: [
    LoginModule,
    WidgetModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
