import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForecastWidgetComponent} from "./components/forecast-widget/forecast-widget.component";
import {WindWidgetComponent} from "./components/wind-widget/wind-widget.component";
import {PrecipitationsWidgetComponent} from "./components/precipitations-widget/precipitations-widget.component";
import {SunMoonWidgetComponent} from "./components/sun-moon-widget/sun-moon-widget.component";
import {SwiperModule} from "swiper/angular";
import {PercentSignAddPipePipe} from "src/app/core/pipes/percent-sign-add-pipe.pipe";
import {CubeSwiperComponent} from "./components/cube-swiper/cube-swiper.component";
import {ScrollUpThemeSwitcherComponent} from "./components/scroll-up-theme-switcher/scroll-up-theme-switcher.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  providers: [
    PercentSignAddPipePipe
  ],
  declarations: [
    ForecastWidgetComponent,
    WindWidgetComponent,
    PrecipitationsWidgetComponent,
    SunMoonWidgetComponent,
    CubeSwiperComponent,
    ScrollUpThemeSwitcherComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  exports: [
    ForecastWidgetComponent,
    WindWidgetComponent,
    PrecipitationsWidgetComponent,
    SunMoonWidgetComponent,
    CubeSwiperComponent,
    ScrollUpThemeSwitcherComponent,
  ]
})
export class WidgetModule { }
