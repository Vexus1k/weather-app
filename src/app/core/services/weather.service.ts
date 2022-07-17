import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {

  }
  private serviceUrl: string = "http://localhost:3000/sendgrid"
  private mailURL = 'http://localhost:3000/sendgrid/';
  rootURL = '/api';

  sendMail(email: any){
    const headers = {'Content-Type': "application/json"}
    email = [{email: email}]
    console.log("email sent")
    return this.http.post(this.mailURL, JSON.stringify(email), {headers})
  }

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', {user});
  }

  getWeatherInfo(){
    return this.http.get(this.serviceUrl)
  }
}
