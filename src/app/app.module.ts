import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './pages/photos/photos.component';

import { NewsComponent } from './pages/news/news.component';
import { ClimateChangesComponent } from './pages/climate-changes/climate-changes.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";


@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    NewsComponent,
    ClimateChangesComponent,
    PageNotFoundComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
