import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-user-quiz-history',
  templateUrl: './user-quiz-history.component.html',
  styleUrls: ['./user-quiz-history.component.css'],
})
export class UserQuizHistoryComponent implements OnInit {
  Qnumber: number = 0;
  username: string = '';
  entry: any;
  LEVEL: Array<string> = ['Beginner', 'Intermediate', 'Expert'];
  constructor(
    private auth: AuthService,
    private quizservice: QuizService,
    private route: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Attempt Details')
    window.scrollTo(0, 0);
    this.entry = this.quizservice.getHistoryEntry();
    this.auth.getUser().subscribe((userDetails) => {
      if (userDetails) this.username = userDetails.displayName || '';
    });
  }

  ngOnInit(): void {}
  Incre(): number {
    this.Qnumber = this.Qnumber + 1;
    return this.Qnumber;
  }
  setZero() {
    this.Qnumber = 0;
  }

  back(): void {
    this.route.navigateByUrl('/profile');
  }
}
