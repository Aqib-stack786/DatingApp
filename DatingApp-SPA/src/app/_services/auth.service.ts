import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logging } from 'protractor';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

/** compenents are injectable but services are not so we ahev to add Injectable to inject services */
@Injectable({
  /** which module is providing service */
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}


  // tslint:disable-next-line:typedef
  login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }
  // tslint:disable-next-line:typedef
  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
  }
  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
