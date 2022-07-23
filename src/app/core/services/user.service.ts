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
  private usernameBehavior = new BehaviorSubject<string>('Initial Value');
  usernameCurrentlyLoginUser: Observable<string> = this.usernameBehavior.asObservable();

  setCurrentlyUserUsername(data: string) {
    this.usernameBehavior.next(data);
  }

  registerUser(user: User){
    const headers = {'Content-Type': "application/json"}
    return this.http.post(this.rootUrl + "/registerUser", JSON.stringify(user), {headers})
  }
  loginUser(user: User){
    const headers = {'Content-Type': "application/json"}
    return this.http.post(this.rootUrl + "/loginUser", JSON.stringify(user), {headers})
  }

}

