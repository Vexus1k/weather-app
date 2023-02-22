import { Injectable } from '@angular/core';
import { AbstractBaseStorageService } from "./AbstractBaseStorage.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends AbstractBaseStorageService {

  protected override readonly storage = localStorage;
}
