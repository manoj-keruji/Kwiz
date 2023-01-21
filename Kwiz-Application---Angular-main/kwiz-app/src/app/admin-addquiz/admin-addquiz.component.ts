import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../_models/quiz';
import { Question } from '../_models/question';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-addquiz',
  templateUrl: './admin-addquiz.component.html',
  styleUrls: ['./admin-addquiz.component.css'],
})
export class AdminAddquizComponent implements OnInit {
  levels = ['Beginner', 'Intermediate', 'Expert'];
  level!: number;
  quiz: Quiz;
  params!: {
    name: string;
    category: string;
  };
  questions = new Array<Question>();
  currentQuestion: Question;
  currentIndex = 0;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private quizservice: QuizService,
    private titleService: Title
  ) {
    this.activatedroute.queryParamMap.subscribe((params) => {
      this.params = {
        category: params.get('category') || '',
        name: params.get('name') || '',
      };
      this.titleService.setTitle(`Add Questions to ${this.params.name}`);
    });
    this.quiz = {
      name: '',
      category: '',
      level: 0,
      questions: [],
    };
    this.currentQuestion = {
      text: '',
      options: new Array<string>(4),
      answerIndex: -1,
    };
  }

  ngOnInit(): void {}
  previousQuestion() {
    this.questions[this.currentIndex] = this.currentQuestion;
    if (this.currentIndex != 0) this.currentIndex--;
    this.currentQuestion = this.questions[this.currentIndex];
  }
  nextQuestion() {
    this.questions[this.currentIndex] = this.currentQuestion;
    if (this.currentIndex < 10) this.currentIndex++;
    this.currentQuestion = this.questions[this.currentIndex] || {
      text: '',
      options: [],
      answerIndex: -1,
    };
  }

  isStart(): boolean {
    if (this.currentIndex > 0) return true;
    else return false;
  }

  isEnd(): boolean {
    if (this.currentIndex < 9) return true;
    else return false;
  }
  addQuiz() {
    this.questions[this.currentIndex] = this.currentQuestion;

    this.quiz.name = this.params.name;
    this.quiz.category = this.params?.category;
    this.quiz.level = this.level;
    this.quiz.questions = this.questions;
    this.quizservice.addQuiz(this.quiz, this.quiz.category);
    this.router.navigateByUrl('/admin');
  }
}
