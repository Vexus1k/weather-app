import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {User} from "../models/global-interfaces";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  registerUser(user: User):Observable<Observable<User>> {
    const headers = {'Content-Type': "application/json"}
    return this.http.post<Observable<User>>(this.rootUrl + "/registerUser", JSON.stringify(user), {headers})
  }

  loginUser(user: User):Observable<Observable<User>>{
    const headers = {'Content-Type': "application/json"}
    return this.http.post<Observable<User>>(this.rootUrl + "/loginUser", JSON.stringify(user), {headers})
  }
}

