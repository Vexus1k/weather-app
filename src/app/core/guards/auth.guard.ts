import {AuthService} from "../services/auth.service";
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import {SocialAuthService} from "@abacritt/angularx-social-login";


@Injectable({
  providedIn: 'root',
})
  export class AuthGuard implements CanActivate {
  constructor( private router: Router, private auth: AuthService,
              private authService: SocialAuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn() ) {
      this.router.navigate(['/login/forms']);
    }
    return (this.auth.isLoggedIn());
  }

}
