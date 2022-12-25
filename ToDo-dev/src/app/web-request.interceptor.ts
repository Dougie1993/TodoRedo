import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, Subject, throwError } from 'rxjs';
import { catchError,switchMap,tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {
  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the requests
    req = this.addAuthHeader(req);

    // Call next and handle response
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          // unauthorized

          // 1st try and get a new access token before logging out
         return this.refreshAccessToken().pipe(
            switchMap(() => {
              req = this.addAuthHeader(req);
              return next.handle(req);
            }),
            catchError((err: any) => {
              console.log(err);
              this.auth.logout();
              return empty();
            })
          )
        }
        return throwError(err);
      })
    )

  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
    // call method in auth service to refresh access token
      return this.auth.getNewAccessToken().pipe(
      tap(() => {
        console.log('Access token refreshed');
        this.refreshingAccessToken = false;
        this.accessTokenRefreshed.next(); //force the subject to rerun again
      })
    )
    }
    
  }
  
  addAuthHeader(request: HttpRequest<any>) {
    //get access token
    const token = this.auth.getAccessToken();
    //append access token to request header
    if(token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
