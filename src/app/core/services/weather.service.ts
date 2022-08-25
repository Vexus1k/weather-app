import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {readDataFromObject, User} from "../models/global-interfaces";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  rootUrl: string = "http://localhost:3000"
  timeZoneApiURL: string = "http://worldtimeapi.org/api/timezone/"
  constructor(private http: HttpClient) {
  }

  private cityIdBehaviour = new BehaviorSubject<string | null>(this.getCookie('cityId'));
  cityId = this.cityIdBehaviour.asObservable();
  setCityId (cityId: string) {
    this.cityIdBehaviour.next(cityId)
  }

  private currentTimeBehaviour = new BehaviorSubject<string | null>(this.getCookie('currentTime'));
  currentTime = this.currentTimeBehaviour.asObservable();
  setCurrentTime (currentTime: string) {
    this.currentTimeBehaviour.next(currentTime)
  }
  getHourlyWeatherInfo(){
    const headers = {'Content-Type': "application/json"}
    let cityId: string = this.getCookie('cityId')!
    let id = {id: cityId}
    return this.http.post<readDataFromObject>(this.rootUrl + "/getHourlyWeatherInfo", JSON.stringify(id), {headers})
  }
  getAdvancedWeatherInfo(){
    const headers = {'Content-Type': "application/json"}
    let cityId: string = this.getCookie('cityId')!
    let id = {id: cityId}
    return this.http.post<readDataFromObject>(this.rootUrl + "/getAdvancedWeatherInfo", JSON.stringify(id), {headers})
  }
  getGeneralWeatherInfo(){
    const headers = {'Content-Type': "application/json"}
    let cityId: string = this.getCookie('cityId')!
    let id = {id: cityId}
    return this.http.post<readDataFromObject>(this.rootUrl + "/getGeneralWeatherInfo", JSON.stringify(id), {headers})
  }
  getLocationId(city: any){
    const headers = {'Content-Type': "application/json"}
    let location = {city: city}
    return this.http.post<readDataFromObject>(this.rootUrl + "/getLocationId", JSON.stringify(location), {headers})
  }
  getLocalTimeForCurrentCity(timezone: string){
    return this.http.get(this.timeZoneApiURL + timezone)
  }
  getCityFromCoords(lat: string, lon: string){
    const headers = {'Content-Type': "application/json"}
    let coords = {lat: lat, lon: lon}
    return this.http.post(this.rootUrl + "/getCityFromCoords", JSON.stringify(coords), {headers})
  }

  setCookie(name:string,value:string,days:number) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

}
