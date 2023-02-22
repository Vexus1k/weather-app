import { Injectable } from '@angular/core';
import { AbstractBaseStorageService } from "./AbstractBaseStorage.service";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends AbstractBaseStorageService {

  protected override storage = sessionStorage;
}
