import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { from } from 'rxjs';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  currentUser: User;

  constructor(private http: HttpClient) {
    let isUserLoggedIn = localStorage.getItem('loggedIn');
    if (isUserLoggedIn === '') {
      isUserLoggedIn = 'false';
    }
    this.loggedIn = JSON.parse(isUserLoggedIn);
  }

  isLoggedIn() {
    return this.loggedIn ? this.loggedIn : false;
  }

  logIn(Data: any) {
    return this.http.post<ReturnObject>('api/account/login', Data);
  }

  logOut() {
    return this.http.get<ReturnObject>('api/account/logout');
  }
}
