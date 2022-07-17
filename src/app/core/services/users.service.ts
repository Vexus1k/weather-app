import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  rootUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }
  registerUser(user: any){
    const headers = {'Content-Type': "application/json"}
    return this.http.post(this.rootUrl + "/registerUser", JSON.stringify(user), {headers})
  }
  getLoginUsersList(){
    return this.http.get<any>(this.rootUrl + "/loginUsers")
  }
}
