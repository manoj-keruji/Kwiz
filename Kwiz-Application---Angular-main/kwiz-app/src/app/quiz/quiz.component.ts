import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { AttemptedQuiz } from '../_models/attempted-quiz';
import { Quiz } from '../_models/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  params: {
    quizId: string;
    category: string;
  } | null = null;

  quiz: Quiz | null = null;
  answerlist: number[] = [];
  visited: boolean[] = [];

  quiz_level = ['Beginner', 'Intermediate', 'Expert'];

  currentIndex = 0;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private quizservice: QuizService,
    private titleSerivce: Title
  ) {}
  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe((params) => {
      this.params = {
        quizId: params.get('quizId') || '',
        category: params.get('category') || '',
      };
      this.fetchQuestions();
    });
  }

  fetchQuestions() {
    if (!this.params) throw new Error('Params empty');

    this.quizservice
      .getQuizById(this.params.category, this.params.quizId)
      .subscribe((doc) => {
        console.log('Fetching... quizes');
        this.quiz = doc.data() as Quiz;
        this.titleSerivce.setTitle(`Attempt ${this.quiz.name}`);
        this.answerlist = new Array<number>(this.quiz.questions.length);
        this.visited = new Array<boolean>(this.quiz.questions.length);
      });
  }

  previousQuestion() {
    if (this.currentIndex != 0) this.currentIndex--;
  }
  nextQuestion() {
    if (this.currentIndex < this.quiz!.questions.length) this.currentIndex++;
  }

  isStart(): boolean {
    if (this.currentIndex > 0) return true;
    else return false;
  }

  isEnd(): boolean {
    if (this.currentIndex < 9) return true;
    else return false;
  }
  submitTest() {
    let score = this.calculateScore();
    this.quizservice.addQuizResult(
      new AttemptedQuiz(
        this.params!.quizId,
        this.params!.category,
        this.answerlist,
        score,
        new Date()
      )
    );
    this.quizservice.setResult(score);
    this.router.navigateByUrl('/result');
  }

  calculateScore(): number {
    let score = 0;
    for (let i = 0; i < this.quiz!.questions.length; i++) {
      // question which not attempted
      // mark using -1 bcoz valid options [0-3]
      if (!this.visited[i]) this.answerlist[i] = -1;

      if (
        this.visited[i] &&
        this.answerlist[i] == this.quiz!.questions[i].answerIndex
      ) {
        score++;
      }
    }
    return score;
  }

  markAnswer(option: number) {
    this.visited[this.currentIndex] = true;
    this.answerlist[this.currentIndex] = option;
  }

  wasSelected(option: number) {
    return (
      this.visited[this.currentIndex] == true &&
      this.answerlist[this.currentIndex] == option
    );
  }
}
