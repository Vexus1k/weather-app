import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {tap, map} from "rxjs/operators";
import {SocialAuthService} from "angularx-social-login";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SocialAuthGuard {
  user: any;
  loggedIn!: boolean;

  constructor(private router: Router, private auth: AuthService
              ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedInByFacebook() ) {
      this.router.navigate(['/login/forms']);
    }
    return (this.auth.isLoggedInByFacebook());
  }
}
