import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login } from './interface/login.interface';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly RootUrl: string;
  constructor(private http: HttpClient) { 
    this.RootUrl = 'http://localhost:3000';
  }

  get(url: string) {
    return this.http.get(`${this.RootUrl}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.RootUrl}/${url}`,payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.RootUrl}/${url}`,payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.RootUrl}/${url}`, {observe: 'response'});
  }

  login (credentials: Login) {
    let email = credentials.email;
    let password = credentials.password;
    return this.http.post(`${this.RootUrl}/users/login`, { email, password }, { observe: 'response' });
  }

  signUp (credentials: Login) {
    return this.http.post(`${this.RootUrl}/users`,  credentials , { observe: 'response' });
  }
}
