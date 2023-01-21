import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../quiz.service';
import { Quiz } from '../_models/quiz';
import { User } from '../_models/user';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  docList: firebase.firestore.DocumentData[];
  subject: string = '';
  user!: User;
  level=["Beginner","Intermediate","Expert"];

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private quizService: QuizService,
    private auth:AuthService
  ) {
    this.docList = [];
    this.activatedroute.params.subscribe((newparams) => {
      this.subject = newparams['str'];
      this.docList = [];
      this.quizService.getQuizes(this.subject).subscribe((querySnapshot) => {
        this.docList=[];
        querySnapshot.forEach((doc) => {
          this.docList.push(doc);
        });
      });
    });
   
  }

  ngOnInit(): void {
    this.docList = [];
  }

  btnClick(doc: firebase.firestore.DocumentData) {
    let quiz = doc.data() as Quiz;
    this.router.navigate(['/quiz/'], {
      queryParams: { quizId: doc.id, category: quiz.category },
    });
  }

  // check for attempted quizes extra functionality not shown in UI
  checkAttempt(quizIdHex:string){
    var bool:boolean=false;
    //console.log(this.user.attemptedQuizes);
    for(let a of this.user.attemptedQuizes)
      {
        if(a.quizId==quizIdHex)
        {
         bool=true;
        }
      }   
    return bool;
  }
}
