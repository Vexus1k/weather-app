import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForecastWidgetComponent} from "./forecast-widget/forecast-widget.component";
import {WindWidgetComponent} from "./wind-widget/wind-widget.component";
import {PrecipitationsWidgetComponent} from "./precipitations-widget/precipitations-widget.component";
import {SunMoonWidgetComponent} from "./sun-moon-widget/sun-moon-widget.component";
import {SwiperModule} from "swiper/angular";
import {PercentSignAddPipePipe} from "../../../admin/pipes/percent-sign-add-pipe.pipe";



@NgModule({
  providers: [
    PercentSignAddPipePipe
  ],
  declarations: [
    ForecastWidgetComponent,
    WindWidgetComponent,
    PrecipitationsWidgetComponent,
    SunMoonWidgetComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
  ],
  exports: [
    ForecastWidgetComponent,
    WindWidgetComponent,
    PrecipitationsWidgetComponent,
    SunMoonWidgetComponent,
  ]
})
export class WidgetModule { }
