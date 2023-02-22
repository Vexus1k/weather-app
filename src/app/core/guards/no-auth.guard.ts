import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from "../services/Identity.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._identityService.identity || state.url.includes('auth/logout')) {
      return true;
    } else {
      this._router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
