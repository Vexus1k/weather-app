import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorBehavior = new BehaviorSubject<{message: string, status: any}>({message: '', status: ''});
  errorStatusAndMessage: Observable<{message: string, status: any}> = this.errorBehavior.asObservable();
  setErrorStatusAndMessage(message: string, status: any) {
    this.errorBehavior.next({message, status});
  }
  constructor(private http: HttpClient) {
  }

}
