import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }

  sendMail(email: any){
    const headers = {'Content-Type': "application/json"}
    return this.http.post(this.rootUrl + '/sendgrid', JSON.stringify(email), {headers})
  }
}
