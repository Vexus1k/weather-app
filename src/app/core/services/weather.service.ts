import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) {

  }


}
