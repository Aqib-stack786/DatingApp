import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse){
          if(error.status === 401) {
            return throwError(error.statusText);
          }
          const applicationError = error.headers.get('Application-Error');
          //// const autherizationHeader = error.headers.get('Authorization');
          //// console.log('Authorization' + autherizationHeader)
          //// console.log('Application-Error'  + applicationError);
          // if server throws exception then print application-error message passed from client
          if (applicationError){
            console.error(applicationError);
            return throwError(applicationError);
          }
          // if not a Exception thrown from client then is server Error
          if (typeof error.error !== 'object'){
            return throwError(error.error);
          }
          const serverError = error.error.errors;
          let modelStateError = '';
          if (serverError && typeof serverError === 'object'){
              for (const key in serverError){
                if (serverError[key]){
                  modelStateError += serverError[key] + '\n';
                }
              }
          }
          return throwError(modelStateError || serverError || 'Server Error');
          // if (serverError.errors && typeof serverError.errors === 'object'){
          //   // A client-side or network error occurred. Handle it accordingly.
          //   console.error('An error occurred:', serverError.errors);
          // }
        }
      })
    );
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
