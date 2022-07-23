import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) {

  }
  sendMail(email: any){
    const headers = {'Content-Type': "application/json"}
    console.log("email sent")
    return this.http.post(this.rootUrl + '/sendgrid', JSON.stringify(email), {headers})
  }
  // handleError(err: any){
  //   if(err instanceof HttpErrorResponse){
  //     return err.name
  //   }
  //   else{
  //     return err.name + ": " + err.message
  //   }
  //   return throwError(err)
  // }
}
