import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  navList: any[] = [];
  widthVal: string = '25';

  constructor(
    private route: Router,
    private quizService: QuizService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Programming Quizes');
    //this.navList=this.QuizService.getCategories() as Array<string>;
    //this.navList = ['JAVA', 'PYTHON', 'JAVASCRIPT', 'ANGULAR'];
  }

  ngOnInit(): void {
    let cat = this.quizService.getCategories();
    if (cat instanceof Observable)
      cat.subscribe((doc) => {
        if (doc.exists) {
          this.navList = Object.keys(doc.data() as Object);
          this.widthVal = 100 / this.navList.length + '';
          this.route.navigateByUrl('home/subject/' + this.navList[0]);
        }
      });
    else {
      this.navList = cat;
      this.widthVal = 100 / this.navList.length + '';
      this.route.navigateByUrl('home/subject/' + this.navList[0]);
    }
  }
}
