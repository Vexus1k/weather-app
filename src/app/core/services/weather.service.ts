import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {

  }
  private mailURL = 'http://localhost:3000/sendgrid';
  rootURL = '/api';

  sendMail(email: any){
    const headers = {'Content-Type': "application/json"}
    console.log("email sent")
    return this.http.post(this.mailURL, JSON.stringify(email), {headers})
  }

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', {user});
  }

  getWeather(){

    // fetch('http://www.7timer.info/bin/api.pl?lon=19.2459612&lat=50.2931811&product=astro&output=json')
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     return myJson.dataseries[0].temp2m;
    //   });
    let link = 'http://www.7timer.info/bin/api.pl?lon=19.2459612&lat=50.2931811&product=astro&output=json';
    return this.http.get(link);

  }
  getWeatherDiagram(){
    return "http://www.7timer.info/bin/civillight.php?lon=19.2459612&lat=50.2931811&ac=0&lang=en&unit=metric&output=internal&tzshift=0";
  }


}
