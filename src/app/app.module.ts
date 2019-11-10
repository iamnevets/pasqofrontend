import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RequestInterceptor } from './request-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { from } from 'rxjs';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { SchoolComponent } from './components/school/school.component';
import { SchoolFormComponent } from './components/school/school-form/school-form/school-form.component';
import { ProgrammeComponent } from './components/programme/programme.component';
import { ProgrammeFormComponent } from './components/programme/programme-form/programme-form.component';
import { CourseComponent } from './components/course/course.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamComponent } from './components/exam/exam.component';
import { ExamFormComponent } from './components/exam/exam-form/exam-form.component';
import { QuestionFormComponent} from './components/question/question-form/question-form.component';
import { ExamViewComponent } from './components/exam/exam-view/exam-view.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    SchoolComponent,
    SchoolFormComponent,
    ProgrammeComponent,
    ProgrammeFormComponent,
    CourseComponent,
    CourseFormComponent,
    ProfileComponent,
    ExamComponent,
    ExamFormComponent,
    QuestionFormComponent,
    ExamViewComponent,
    HomePageComponent,
    FeaturesComponent,
    AboutUsComponent,
    ContactUsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
