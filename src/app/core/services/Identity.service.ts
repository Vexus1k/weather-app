import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "./LocalStorage.service";
import { WAIdentity } from "../interfaces/WAIdentity";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private readonly _storageKey = 'identity';
  private readonly _isAuthenticated$ = new BehaviorSubject(!!this.identity)

  constructor(
    private readonly _localStorageService: LocalStorageService
  ) { }

  public get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated$.getValue();
  }

  public get identity(): WAIdentity {
    return this._localStorageService.getItem(this._storageKey);
  }

  public set identity(identity: WAIdentity) {
    this._localStorageService.setItem(this._storageKey, identity);
    this._isAuthenticated$.next(true);
  }

  public destroyIdentity(): void {
    this._localStorageService.removeItem(this._storageKey);
    this._isAuthenticated$.next(false);
  }
}
