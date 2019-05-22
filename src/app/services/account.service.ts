import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { ExternalService } from './external.service';
import { Router } from '@angular/router';
import { ErrorMessageService } from './error-message.service';


@Injectable()
export class AccountService {

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json; charset=utf-8'
  }); 
  
  constructor(
    private http: HttpClient,
    private externalService: ExternalService,
    private router: Router,
    private errorMessageService: ErrorMessageService
  ){}

  register(data){
    this.http.post(`${this.externalService.getURL()}/registration`, data, { headers: this.httpHeaders, observe: 'response'})
    .subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        localStorage.setItem('token', response.body.data.access_token);
        localStorage.setItem('user', response.body.data.username);
        localStorage.setItem('role', response.body.data.role);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errorMessageService.sendError(error, 'Authenticate error');
    });
  }

  login(data){
    this.http.post(`${this.externalService.getURL()}/login`, data, { headers: this.httpHeaders, observe: 'response'})
    .subscribe(
    (response: HttpResponse<any>) => {
      localStorage.setItem('token', response.body.data.access_token);
      localStorage.setItem('user', response.body.data.username);
      localStorage.setItem('role', response.body.data.role);
      this.router.navigate(['/']);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessageService.sendError(error, 'Authenticate error');
    });
  }

  isAuthenticated(){
    if(localStorage.getItem('token') !== null){
      return true;
    }
     return false;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  getEmail() {
    return localStorage.getItem('user');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    return role ? role === 'admin' : false
  }
  
  checkLogin() {
    this.http.post(`${this.externalService.getURL()}/authentication`, { headers: this.httpHeaders, observe: 'response'})
    .subscribe(
    (response: any) => {
      if(response.data !== null && response.data.access_token ) {
        localStorage.setItem('token', response.data.access_token);
      }
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      this.logout();
      console.log(error);
    });
  }
}