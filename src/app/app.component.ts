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
  faSignOutAlt,
  faClock,
  faGamepad,
  faChartBar,
  faSmileWink,
  faEnvelope,
  faComment,
  faCommentAlt
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HomePageService } from './components/home-page/home-page.service';
import { SignUpService } from './components/sign-up/sign-up.service';
import { User } from './models/user';
import { UserService } from './components/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pasqo';
  route: string;
  isHome = false;
  currentUserName: string;
  isRootAdmin = false;

  currentPageIsHome: string;
  currentPageIsFeatured: string;
  currentPageIsAbout: string;
  currentPageIsContact: string;

  currentPageIsDashboard: string;
  currentPageIsExams: string;
  currentPageIsCourses: string;
  currentPageIsProgrammes: string;
  currentPageIsSchools: string;
  currentPageIsUsers: string;
  currentPageIsMessages: string;
  currentPageIsProfile: string;
  currentPageIsPractice: string;
  currentPageIsExamination: string;
  currentPageIsFlashQuiz: string;

  faFileAlt = faFileAlt;
  faBookReader = faBookReader;
  faGraduationCap = faGraduationCap;
  faSchool = faSchool;
  faUniversity = faUniversity;
  faUsers = faUsers;
  faUser = faUser;
  faHome = faHome;
  faChartBar = faChartBar;
  faClock = faClock;
  faGamepad = faGamepad;
  faSmileWink = faSmileWink;
  faSignOutAlt = faSignOutAlt;
  faComment = faComment;

  constructor(
    private userService: UserService,
    private signUpService: SignUpService,
    private loginService: LoginService,
    private homePageService: HomePageService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.currentUserName = currentUser.UserName;

    if (currentUser.Name.toLowerCase() === 'administrator') {
      this.isRootAdmin = true;
    }
  }

  myHome() {
    this.currentPageIsHome = 'page';
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = '';

    this.router.navigateByUrl('home');
  }

  dashboard() {
    this.currentPageIsExams = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
    this.currentPageIsDashboard = 'page';

    this.homePageService.isHome = false;
    this.loginService.isLoginPage = false;
    this.router.navigateByUrl('dashboard');
  }

  features() {
    this.currentPageIsHome = '';
    this.currentPageIsFeatured = 'page';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = '';

    this.router.navigateByUrl('features');
  }

  aboutUs() {
    this.currentPageIsHome = '';
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = 'page';
    this.currentPageIsContact = '';

    this.router.navigateByUrl('about');
  }

  contactUs() {
    this.currentPageIsHome = '';
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = 'page';

    this.router.navigateByUrl('contact');
  }

  signUp() {
    this.currentPageIsHome = '';
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = '';

    this.router.navigateByUrl('signup');
  }

  login() {
    this.currentPageIsHome = '';
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = '';

    this.loginService.isLoginPage = true;
    this.router.navigateByUrl('login');
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

            this.currentPageIsHome = 'page';
            this.currentPageIsFeatured = '';
            this.currentPageIsAbout = '';
            this.currentPageIsContact = '';
            this.router.navigateByUrl('home');
          }
        });
      }
    });
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

  isUserStudent() {
    return this.userService.isUserStudent();
  }

  home() {
    this.currentPageIsFeatured = '';
    this.currentPageIsAbout = '';
    this.currentPageIsContact = '';
    this.currentPageIsHome = 'page';
    this.homePageService.isHome = true;
    this.router.navigateByUrl('home');
  }

  onClickExams() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = 'page';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
  }

  onClickCourses() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = 'page';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
  }

  onClickProgrammes() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = 'page';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
  }

  onClickSchools() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = 'page';
    this.currentPageIsUsers = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
  }

  onClickUsers() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = 'page';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = '';
  }

  onClickMessages() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsMessages = 'page';
    this.currentPageIsProfile = '';
  }

  onClickProfile() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsCourses = '';
    this.currentPageIsProgrammes = '';
    this.currentPageIsSchools = '';
    this.currentPageIsUsers = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsMessages = '';
    this.currentPageIsProfile = 'page';
  }

  onClickPractice() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsPractice = 'page';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsProfile = '';
  }

  onClickExamination() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = 'page';
    this.currentPageIsFlashQuiz = '';
    this.currentPageIsProfile = '';
  }

  onClickFlashQuiz() {
    this.currentPageIsDashboard = '';
    this.currentPageIsExams = '';
    this.currentPageIsPractice = '';
    this.currentPageIsExamination = '';
    this.currentPageIsFlashQuiz = 'page';
    this.currentPageIsProfile = '';
  }
}
