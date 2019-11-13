import { Router } from '@angular/router';
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
import Swal from 'sweetalert2';
import { HomePageService } from './components/home-page/home-page.service';
import { SignUpService } from './components/sign-up/sign-up.service';

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

  constructor(
    private signUpService: SignUpService,
    private loginService: LoginService,
    private homePageService: HomePageService,
    private router: Router
  ) {}

  ngOnInit() {}

  myHome() {
    this.router.navigateByUrl('home');
  }

  dashboard() {
    this.homePageService.isHome = false;
    this.loginService.isLoginPage = false;
    this.router.navigateByUrl('dashboard');
    // location.replace('dashboard');
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
    this.loginService.isLoginPage = true;
    this.router.navigateByUrl('login');
  }

  isHomePage() {
    return this.homePageService.isHomePage();
  }

  isLoginPage() {
    return this.loginService.onLoginPage();
  }

  isSignUpPage() {
    return this.signUpService.onSignUpPage();
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
    this.homePageService.isHome = true;
    this.router.navigateByUrl('home');
  }
}
