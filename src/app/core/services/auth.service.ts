import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setUsername(username: string): void{
    localStorage.setItem('username', username);
  }

  getUsername(): string | null{
    return localStorage.getItem('username')
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setFacebookToken(token: string): void {
    localStorage.setItem('facebookToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getFacebookToken() {
    return localStorage.getItem('facebookToken');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isLoggedInByFacebook() {
    return this.getFacebookToken() !== null;
  }
// || localStorage.getItem('google_auth') !== null
  logout() {
    // this.authService.signOut().then()
    localStorage.removeItem('facebookToken');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login/forms').then();
  }

}
