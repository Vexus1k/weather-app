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
  setIsFacebookOrGoogleCall (platformName: string) {
    this.isFacebookOrGoogleBehaviour.next(platformName)
  }

  addUserToGoogleDb(user: userGoogleDb) {
    console.log(user)
    const headers = {'Content-Type': "application/json"}
    let userObject = {email: user.email, username: user.username}
    return this.http.post<readDataFromObject>(this.rootUrl + "/addUserToGoogleDb", JSON.stringify(userObject), {headers})
  }
  addUserToFacebookDb(user: userFacebookDb) {
    console.log(user)
    const headers = {'Content-Type': "application/json"}
    let userObject: userFacebookDb = {userId: user.userId, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName}
    return this.http.post<readDataFromObject>(this.rootUrl + "/addUserToFacebookDb", JSON.stringify(userObject), {headers})
  }
  checkGoogleUserAlreadyExists(email: string): Observable<isUserExist> {
    const headers = {'Content-Type': "application/json"}
    let emailObject = {email: email}
    return this.http.post<isUserExist>(this.rootUrl + "/checkUserExistInGoogleDb", JSON.stringify(emailObject), {headers})
  }
  checkFacebookUserAlreadyExists(email: string): Observable<isUserExist> {
    const headers = {'Content-Type': "application/json"}
    let emailObject = {email: email}
    return this.http.post<isUserExist>(this.rootUrl + "/checkUserExistInFacebookDb", JSON.stringify(emailObject), {headers})
  }
  checkUsernameExistInAllDbs(username: string) {
    const headers = {'Content-Type': "application/json"}
    let usernameObject = {username: username}
    return this.http.post<boolean>(this.rootUrl + "/checkUsernameExistInAllDbs", JSON.stringify(usernameObject), {headers})
  }

  registerUser(user: User):Observable<Observable<User>> {
    const headers = {'Content-Type': "application/json"}
    return this.http.post<Observable<User>>(this.rootUrl + "/registerUser", JSON.stringify(user), {headers})
  }

  loginUser(user: User):Observable<Observable<User>> {
    const headers = {'Content-Type': "application/json"}
    return this.http.post<Observable<User>>(this.rootUrl + "/loginUser", JSON.stringify(user), {headers})
  }

  changeUsername(username: string, oldUsername: string, database: string): Observable<isUserExist>{
    const headers = {'Content-Type': "application/json"}
    let usernameObject = {username: username, oldUsername: oldUsername, database: database}
    console.log(usernameObject.username, usernameObject.oldUsername)
    return this.http.post<isUserExist>(this.rootUrl + "/changeUsername", JSON.stringify(usernameObject), {headers})
  }
  changePassword(username: string, password: string){
    const headers = {'Content-Type': "application/json"}
    let object = {username: username, password: password}
    return this.http.post<isUserExist>(this.rootUrl + "/changePassword", JSON.stringify(object), {headers})
  }
  checkPasswordValidation(value: string) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
      return "Must not contain whitespaces.";
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "One uppercase character.";
    }
    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
      return "One lowercase character.";
    }
    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
      return "One digit.";
    }
    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
      return "8-16 Characters Long.";
    }
    return ""
  }
}

