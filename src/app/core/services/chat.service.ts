import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs-compat/Rx';
import { WebsocketService } from './websocket.service';
import { environment } from '../../../environments/environment'
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {UserInfo} from "../models/global-interfaces";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser | null>(1)
  userProfileSubject = new Subject<UserInfo>()

  constructor(private wsService: WebsocketService, private oAuthService: OAuthService) {
    // oAuthService.configure(oAuthConfig)
    // oAuthService.loadDiscoveryDocument().then( () => {
    //   oAuthService.tryLoginImplicitFlow().then( () => {
    //     if(!oAuthService.hasValidAccessToken()) {
    //       oAuthService.initLoginFlow()
    //     }
    //     else {
    //       oAuthService.loadUserProfile().then( (userProfile) => {
    //         console.log(JSON.stringify(userProfile))
    //       })
    //     }
    //   })
    // })
    // gapi.load('auth2', () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '1039016516202-63a7bkh2hgdbk6h5lc1jadi01clj3bhh.apps.googleusercontent.com',
    //     // plugin_name: "Web Client Google - My Weather App",
    //     hosted_domain: "http://localhost:4200",
    //     scope: "openid profile email",
    //     fetch_basic_profile: false,
    //   })
    // })
  }
  isLoggedIn() {
    return this.oAuthService.hasValidAccessToken()
  }
  sign() {
    this.oAuthService.configure(oAuthConfig)
    this.oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
        if(!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow()
        }
        else {
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)

            console.log("penis")
          })
          alert("chuj")
          setTimeout(() => {console.log("penis")}, 5000)
        }
      })
    })
  }
  signO() {
    this.oAuthService.logOut()
  }
  signIn() {
    this.auth2.signIn({

    }).then( user => {
      this.subject.next(user)
    }). catch( () => {
      this.subject.next(null)
    })
  }

  signOut(){
    this.auth2.signOut()
      .then( () => {
        this.subject.next(null)
      })
  }

  observable() : Observable<gapi.auth2.GoogleUser | null>{
    return this.subject.asObservable()
  }
}
