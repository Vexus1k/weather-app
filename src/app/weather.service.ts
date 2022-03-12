import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(){
    let url = "https://www.7timer.info/bin/civillight.php?lon=19.2459612&lat=50&ac=0&unit=metric&output=json&tzshift=0";
    return this.http.get<object>(url);
  }
  getWeatherDiagram(){
    return "http://www.7timer.info/bin/civillight.php?lon=19.2459612&lat=50.2931811&ac=0&lang=en&unit=metric&output=internal&tzshift=0";
  }

}
