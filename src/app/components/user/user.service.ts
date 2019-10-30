import { ReturnObject } from './../../models/return-object';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createOrUpdateUser(data: User) {
    if (data.Id) {
      return this.http.put<ReturnObject>('api/account/UpdateUser', data);
    }

    return this.http.post<ReturnObject>('api/account/CreateUser', data);
  }

  getUsers() {
    return this.http.get<ReturnObject>('api/account/GetUsers');
  }

  getUserDetails(id: string) {
    return this.http.get<ReturnObject>('api/account/GetUserDetails?id=' + id);
  }

  deleteUser(id: string) {
    return this.http.delete<ReturnObject>('api/account/DeleteUser?id=' + id);
  }

  getRoles() {
    return this.http.get<ReturnObject>('api/account/GetRoles');
  }

  changePassword(data: any) {
    return this.http.post<ReturnObject>('api/account/ChangePassword', data);
  }
}
