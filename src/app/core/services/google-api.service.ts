// import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
// import { Injectable, NgZone } from '@angular/core';
// import { BehaviorSubject, Subject } from "rxjs";
// import { UserInfo } from "../models/global-interfaces";
// import { HttpClient } from '@angular/common/http';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleApiService {
//
//   public auth2: any;
//   public user$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
//   public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   // validateToken(token: string): Observable<User> {
//   //   return this.http.get<User>(`http://yourServer:3000/validationApi/${token}`);
//   // }
//   // signIn(): void {
//   //   this.auth2.signIn().then(user => {
//   //     this.validateToken(user.getAuthResponse().id_token).subscribe(user => {
//   //         this.zone.run(() => {
//   //           this.user$.next(user);
//   //           this.isLoggedIn$.next(true);
//   //         });
//   //       },
//   //       (err) => {
//   //         console.error(err);
//   //       });
//   //   });
//   // };
//
//   // signOut(): void {
//   //   this.auth2.signOut().then(() => {
//   //       this.zone.run(() => {
//   //         this.isLoggedIn$.next(false);
//   //         this.user$.next(null);
//   //       });
//   //     },
//   //     (err: any) => {
//   //       console.error(err);
//   //     });
//   // }
//   //
//   // loadAuth2(): void {
//   //   gapi.load('auth2', () => {
//   //     gapi.auth2.init({
//   //       client_id: 'yourClientId',
//   //       fetch_basic_profile: true
//   //     }).then((auth) => {
//   //         this.zone.run(() => {
//   //           this.auth2 = auth;
//   //           this.isLoaded$.next(true);
//   //         });
//   //       },
//   //     );
//   //   });
//   // }
//   OAuthConfig: AuthConfig = {
//     issuer: 'https://accounts.google.com',
//     strictDiscoveryDocumentValidation: true,
//     redirectUri: 'http://localhost:4200/login/forms',
//     clientId: '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com',
//     scope: 'openid profile email'
//   }
//
//   userProfileSubject = new Subject<UserInfo>()
//
//   constructor(private readonly oAuthService: OAuthService, private zone: NgZone, private http: HttpClient) {
//
//   }
//
//   singIn(){
//
//   }
//
//   isLoggedIn(): boolean {
//     return this.oAuthService.hasValidAccessToken()
//   }
//
//   singOut(): void {
//     this.oAuthService.logOut()
//   }
// }
