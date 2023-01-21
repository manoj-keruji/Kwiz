import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResultComponent } from './result/result.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ProfileComponent } from './profile/profile.component';
import { UserQuizHistoryComponent } from './user-quiz-history/user-quiz-history.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddquizComponent } from './admin-addquiz/admin-addquiz.component';
import { AdminGuard } from './auth/admin.guard';
import { ChartsComponent } from './charts/charts.component';

//Routing configuration
const routes: Routes = [
  {
    path: '', //default component
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [],
    canActivate: [AuthGuard],
  },
  {
    path: 'history/:category/:quizId/:date',
    component: UserQuizHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    
     component: DashboardComponent,
    children: [
      {
        path: 'subject/:str',
        component: QuizListComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'addquiz',
    component: AdminAddquizComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '***', //Invalid route---always place at the end
     component: PageNotFoundComponent,
    
  },
  {
    path: 'chart', //Invalid route---always place at the end
    component: ChartsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
