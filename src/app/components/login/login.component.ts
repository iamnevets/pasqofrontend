import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login = { Username: '', Password: '', RememberMe: false };

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {}

  // check() {
  //   if (!this.user.Username) {
  //     // show error message
  //     return;
  //   }

  //   if (!this.user.Password) {
  //     // show error message
  //     return;
  //   }

  //   this.login();
  // }

  login() {
    this.loginService.logIn(this.user).subscribe(res => {
      if (res.Success) {
        // console.log(res.Data.UserRole.Name);       //Use this to check if user is a student or admin
        this.router.navigateByUrl('dashboard');
        Swal.fire({
          title: 'Welcome',
          text: 'Successful Login',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.loginService.loggedIn = true;
        localStorage.setItem('loggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(res.Data));
      } else {
        Swal.fire({
          title: 'Failed',
          text: res.Message,
          type: 'error',
          showConfirmButton: true
          // timer: 1000
        });
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure?',
      type: 'question',
      showConfirmButton: true
    });
    this.loginService.logOut().subscribe(res => {
      if (res.Success) {
        this.loginService.loggedIn = false;
        localStorage.setItem('loggedIn', JSON.stringify(false));
      }
    });
  }

  home() {
    this.router.navigateByUrl('home');
  }

}
