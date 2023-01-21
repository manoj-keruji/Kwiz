import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { environment } from 'src/environments/environment'
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResultComponent } from './result/result.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserQuizHistoryComponent} from './user-quiz-history/user-quiz-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from '@angular/material/icon';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddquizComponent } from './admin-addquiz/admin-addquiz.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';
// Firebase configuration

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, PageNotFoundComponent, ResultComponent, NavbarComponent, FooterComponent, QuizComponent, DashboardComponent, QuizListComponent, ProfileComponent,UserQuizHistoryComponent, AdminDashboardComponent, AdminAddquizComponent, ChartsComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    CdTimerModule,
    ChartsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
