import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormsComponent } from "./components/login-forms/login-forms.component";
import { RegisterFormsComponent } from "./components/register-forms/register-forms.component";
import { LoginRegisterButtonsComponent } from "./components/login-register-buttons/login-register-buttons.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SwiperModule } from "swiper/angular";


import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { LoginUserComponent } from "./components/login-user/login-user.component";
import { LoginRoutingModule } from "./login-routing-module";
import { LoginArticleBoxComponent } from "./components/login-article-box/login-article-box.component";
import { WidgetModule } from "../widgets-module/widget.module";
import { SetUsernameComponent } from "./components/set-username/set-username.component";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";

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
    LoginArticleBoxComponent,
    SetUsernameComponent,
  ],
  imports: [
    SocialLoginModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoginRoutingModule,
    WidgetModule
  ],
  providers: [{provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('2035970956791547')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  exports: [
    LoginRegisterButtonsComponent,
    LoginArticleBoxComponent
  ]
})
export class LoginModule { }
