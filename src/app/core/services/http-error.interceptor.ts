import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ErrorService} from "./error.service";
import {AppInjector} from '../../app.module';


export class HttpErrorInterceptor implements HttpInterceptor {
  errorService: ErrorService = AppInjector.get(ErrorService);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
          }else if(error.status === 409){
            this.errorService.setErrorStatusAndMessage("User already exists.", false)
          }
          else if(error.status === 401){
            this.errorService.setErrorStatusAndMessage("Incorrect login or password. Try again", false)
          }
          else {
            this.errorService.setErrorStatusAndMessage('Something went wrong.', false)
          }
          return throwError(errorMessage);
        })
      )
  }
}
