import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {tap, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              ) {
  }

}
