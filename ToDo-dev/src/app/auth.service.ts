import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './interface/login.interface';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, 
    private webReqService: WebRequestService, 
    private router: Router) { 
  }

  login(credentials: Login) {
    return this.webReqService.login(credentials).pipe(
      shareReplay(), //we dont wanna run the login method multiple times
      tap(( res: HttpResponse<any>) => {
        //Auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log('LOGIN');
        this.router.navigate(['/lists']);
      })
    )
  }

  signUp(credentials: Login) {
    return this.webReqService.signUp(credentials).pipe(
      shareReplay(), //we dont wanna run the login method multiple times
      tap(( res: HttpResponse<any>) => {
        //Auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log('Signed up and Logged in');
        this.router.navigate(['/lists']);
      })
    )
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  setRefreshsToken(refreshToken: string) {
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  getNewAccessToken() {
    return this.http.get(`${this.webReqService.RootUrl}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      }, observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
  
  private setSession( userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

}
