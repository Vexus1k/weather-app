import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SocialAuthGuard implements CanActivate {
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
