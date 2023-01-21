import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../quiz.service';
import { User } from '../_models/user';
import { Sorted } from './sortQuiz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  entries: any[] = [];
  mySelect: string = '0';
  level = ['Beginner', 'Intermediate', 'Expert'];
  custumSort = new Sorted();
  photoUrl: string = '';
  visible: boolean = false;
  constructor(
    public authService: AuthService,
    private quizService: QuizService,
    private router: Router,
    private titleService: Title
  ) {
    this.displayName = this.authService.getDisplayName() || '';
    this.photoUrl = this.authService.getPhotoUrl() || '';
    this.titleService.setTitle(`${this.displayName}`)
  }

  ngOnInit(): void {
    if (!this.photoUrl) this.photoUrl = this.authService.getPhotoUrl() || '';
    if (!this.displayName)
      this.displayName = this.authService.getDisplayName() || '';

    this.authService.getAttemptedQuizes().subscribe((doc) => {
      let user = doc.payload.data() as User;
      this.entries = [];
      user.attemptedQuizes.forEach((attemptQuiz) => {
        this.quizService
          .getQuizById(attemptQuiz.category, attemptQuiz.quizId)
          .subscribe((quiz) => {
            this.entries.push({
              quiz: quiz.data(),
              user: attemptQuiz,
            });
          });
      });
    });
  }

  updateDisplayName() {
    this.authService
      .updateDisplayName(this.displayName)
      .then(() => {
        console.log('updated displayName!!');
      })
      .catch((err) => console.log('fail to update displayName', err));
  }

  sort() {
    switch (this.mySelect) {
      case '1': {
        this.entries.sort(this.custumSort.sortByCategory);
        break;
      }
      case '2': {
        this.entries.sort(this.custumSort.sortByDateDec);
        break;
      }

      case '3': {
        this.entries.sort(this.custumSort.sortByDateAcc);
        break;
      }

      case '4': {
        this.entries.sort(this.custumSort.sortByScore);
        break;
      }

      case '5': {
        this.entries.sort(this.custumSort.sortByLevel);
        break;
      }

      case '6': {
        this.entries.sort(this.custumSort.sortByName);
        break;
      }

      default: {
        break;
      }
    }
  }

  setcharts()
  {
    this.router.navigateByUrl('/chart');
  }
  setEntryToService(entry: any) {
    this.quizService.setHistoryEntry(entry);
  }

  updatePhotoUrl() {
    console.log('updating');
    this.photoUrl;
    this.authService
      .updatePhotoUrl(this.photoUrl)
      ?.then(() => {
        console.log('updated successfully');
      })
      .catch((err) => console.log(err));
    this.toggleVisibility();
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }
}
