import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  username: string = '';
  score = 0;

  constructor(
    private authService: AuthService,
    private quizservice: QuizService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Result')
    this.authService.getUser().subscribe((userDetails) => {
      if (userDetails) this.username = userDetails.displayName || '';
    });
  }

  isPassed(): boolean {
    if (this.score >= 6) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.score = this.quizservice.getResult();
  }
}
