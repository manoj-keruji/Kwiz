
import { Component, } from '@angular/core';
import {Chart,  ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../quiz.service';
import { AttemptedQuiz } from '../_models/attempted-quiz';
import { User } from '../_models/user';
import { Quiz } from '../_models/quiz';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent {
  entries: any[] = [];
  chart =[];
  str:string="";
  scorepy:any[]=[];
  scorejv:any[]=[];
  scorean:any[]=[];
  scorejs:any[]=[];

  quiz: Quiz | undefined;
  map1 = new Map<String, number>();
   i=0;

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Scores ' },
  ];



  mydata:ChartDataSets[]=[];
  lineChartLabels: Label[] = ["","","",""];

  lineChartOptions = {
    responsive: true,
    fill:true,
    CanvasGradient:true
  };


  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: '#E5FFF1',
    },
    {
      borderColor: 'green',
      backgroundColor: '#84F3AA',
    },
    {
      borderColor: 'red',
      backgroundColor: '#FADEE0',

    },
    {
      borderColor: 'black',
      backgroundColor: 'black',
      pointBorderWidth:2,
    },
  ];
  pipe = new DatePipe('en-US');
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as ChartType;

  constructor(
    public authService: AuthService,
    private quizService: QuizService,
    private route:Router
  ) {

  }
  ngOnInit(): void {

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

        if(attemptQuiz.category==="PYTHON")
         this.scorepy.push(attemptQuiz.score);
         if(attemptQuiz.category==="JAVA")
         this.scorejv.push(attemptQuiz.score);
         if(attemptQuiz.category==="JAVASCRIPT")
         this.scorejs.push(attemptQuiz.score);
         if(attemptQuiz.category==="ANGULAR")
         this.scorean.push(attemptQuiz.score);

        });
         this.str= attemptQuiz.category;
        for(this.i=0;this.i<4;this.i++)
        {
          this.lineChartData = [
            { data : this.scorepy, label: 'PYTHON ',fill:true},
            { data : this.scorejv, label: 'JAVA ',fill:true },
            { data : this.scorejs, label: 'JAVASCRIPT ',fill:true },
            { data : this.scorean, label: 'ANGULAR ',fill:true },

          ]
        }
      });
  });
}

back():void{
  this.route.navigateByUrl("/profile");
  }

}

