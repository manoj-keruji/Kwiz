import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  quizName!: string;
  category: string;
  categories!: Array<string>;
  constructor(
    private route: Router,
    private quizService: QuizService,
    private titleService: Title
  ) {
    //this.categories = this.quizService.getCategories() as Array<string>;
    this.category = '';
    this.categories = [];
    this.titleService.setTitle(`Create New Quiz`);
  }

  ngOnInit(): void {
    let cat = this.quizService.getCategories();
    if (cat instanceof Observable)
      cat.subscribe((doc) => {
        if (doc.exists) {
          this.categories = Object.keys(doc.data() as Object);
        }
      });
    else {
      this.categories = cat;
    }
  }

  AddQues() {
    this.quizService
      .checkQuizExists(this.quizName, this.category)
      .pipe(take(1))
      .subscribe((querySnapshot) => {
        if (querySnapshot.empty) {
          this.route.navigate(['/addquiz/'], {
            queryParams: { category: this.category, name: this.quizName },
          });
        } else {
          window.alert('Quiz Already Exits!!');
          this.quizName = '';
        }
      });
  }
}
