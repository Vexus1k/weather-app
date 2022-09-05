import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SwiperModule} from "swiper/angular";
import {HeaderComponent} from "./shared/layout/header/header.component";
import { CubeSwiperComponent } from './modules/widgets-module/components/cube-swiper/cube-swiper.component';
import { ScrollUpThemeSwitcherComponent } from './modules/widgets-module/components/scroll-up-theme-switcher/scroll-up-theme-switcher.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginModule} from "./modules/login-module/login.module";
import {WidgetModule} from "./modules/widgets-module/widget.module";
import { OAuthModule } from 'angular-oauth2-oidc';


import { HttpErrorInterceptor } from './core/services/http-error.interceptor'
import { LoginArticleBoxComponent } from './modules/login-module/components/login-article-box/login-article-box.component';
import { SetUsernameComponent } from './modules/login-module/components/set-username/set-username.component';


export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    LoginModule,
    WidgetModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
