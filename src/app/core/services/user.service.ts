import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {isUserExist, readDataFromObject, User, userFacebookDb, userGoogleDb} from "../models/global-interfaces";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  private isFacebookOrGoogleBehaviour = new BehaviorSubject<string>('');
  isFacebookOrGoogleCall = this.isFacebookOrGoogleBehaviour.asObservable();
  setIsFacebookOrGoogleCall (cityId: string) {
    this.isFacebookOrGoogleBehaviour.next(cityId)
  }
  addUserToGoogleDb(user: userGoogleDb){
    console.log(user)
    const headers = {'Content-Type': "application/json"}
    let userObject = {email: user.email, username: user.username}
    return this.http.post<readDataFromObject>(this.rootUrl + "/addUserToGoogleDb", JSON.stringify(userObject), {headers})
  }
  addUserToFacebookDb(user: userFacebookDb){
    console.log(user)
    const headers = {'Content-Type': "application/json"}
    let userObject = {id: user.userId, username: user.username}
    return this.http.post<readDataFromObject>(this.rootUrl + "/addUserToFacebookDb", JSON.stringify(userObject), {headers})
  }
  checkGoogleUserAlreadyExists(email: string): Observable<isUserExist> {
    const headers = {'Content-Type': "application/json"}
    let emailObject = {email: email}
    return this.http.post<isUserExist>(this.rootUrl + "/checkUserExistInGoogleDb", JSON.stringify(emailObject), {headers})
  }
  checkFacebookUserAlreadyExists(email: string): Observable<isUserExist>{
    const headers = {'Content-Type': "application/json"}
    let emailObject = {email: email}
    return this.http.post<isUserExist>(this.rootUrl + "/checkUserExistInFacebookDb", JSON.stringify(emailObject), {headers})
  }
  checkUsernameExistInAllDbs(username: string){
    const headers = {'Content-Type': "application/json"}
    let usernameObject = {username: username}
    return this.http.post<boolean>(this.rootUrl + "/checkUsernameExistInAllDbs", JSON.stringify(usernameObject), {headers})
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

