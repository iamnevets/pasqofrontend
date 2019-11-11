import { Event, NavigationStart, NavigationEnd, NavigationError, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './components/login/login.service';
import {
  faFileAlt,
  faSchool,
  faUniversity,
  faUsers,
  faBookReader,
  faUser,
  faGraduationCap,
  faHome,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { getCurrencySymbol } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { HomePageService } from './components/home-page/home-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pasqo';
  route: string;
  isHome = false;

  faFileAlt = faFileAlt;
  faBookReader = faBookReader;
  faGraduationCap = faGraduationCap;
  faSchool = faSchool;
  faUniversity = faUniversity;
  faUsers = faUsers;
  faUser = faUser;
  faHome = faHome;
  faSignOutAlt = faSignOutAlt;

  constructor(private loginService: LoginService, private homePageService: HomePageService, private router: Router) {}

  ngOnInit() {
    // this.route = (window.location.pathname.replace('/', '').toUpperCase());
    // if (this.route === 'LOGIN') { this.route = 'DASHBOARD'; }
  }

  myHome() {
    this.router.navigateByUrl('home');
  }

  dashboard() {
    this.router.navigateByUrl('dashboard');
  }

  features() {
    this.router.navigateByUrl('features');
  }

  aboutUs() {
    this.router.navigateByUrl('about');
  }

  contactUs() {
    this.router.navigateByUrl('contact');
  }

  signUp() {
    this.router.navigateByUrl('signup');
  }

  login() {
    this.router.navigateByUrl('login');
  }

  isHomePage() {
    return this.homePageService.isHomePage();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    Swal.fire({
      title: 'Confirm Logout',
      text: '',
      type: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#40844e'
    }).then(result => {
      if (result.value) {
        this.loginService.logOut().subscribe(res => {
          if (res.Success) {
            this.loginService.loggedIn = false;
            localStorage.setItem('loggedIn', JSON.stringify(false));
            this.router.navigateByUrl('home');
          }
        });
      }
    });
  }

  home() {
    this.homePageService.isHome = false;
    this.router.navigateByUrl('home');
    location.replace('home');
  }

}
