import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {User} from "../models/global-interfaces";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  rootUrl: string = "http://localhost:3000"
  timeZoneApiURL: string = "http://worldtimeapi.org/api/timezone/"
  constructor(private http: HttpClient) {

  }
  getWeatherForTwoWeeks(){
    return this.http.get(this.rootUrl + "/getWeatherInfo")
  }
  getLocationId(city: any){
    const headers = {'Content-Type': "application/json"}
    city = {city: city}
    return this.http.post(this.rootUrl + "/getLocationId", JSON.stringify(city), {headers})
  }
  getLocalTimeForCurrentCity(timezone: string){
    return this.http.get(this.timeZoneApiURL + timezone)
  }

}
