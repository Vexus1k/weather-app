import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }
  private usernameBehavior = new BehaviorSubject<string>('Initial Value');
  usernameCurrentlyLoginUser: Observable<string> = this.usernameBehavior.asObservable();

  sendCurrentlyUserUsername(data: string) {
    this.usernameBehavior.next(data);
  }

  registerUser(user: any){
    const headers = {'Content-Type': "application/json"}
    return this.http.post(this.rootUrl + "/registerUser", JSON.stringify(user), {headers})
  }
  getLoginUsersList(){
    return this.http.get<any>(this.rootUrl + "/loginUsers")
  }
}
