import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { AttemptedQuiz } from './_models/attempted-quiz';
import { Question } from './_models/question';
import { Quiz } from './_models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // stores previous Attempt + Quiz Entry
  private entry: any;
  private categories: any;

  private result: number = 0;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    /*
     * take() means fetch only one result
     * and unsubscribe
     */
    this.firestore
      .doc('quizes/category')
      .get()
      .pipe(take(1))
      .subscribe((doc) => {
        if (doc.exists) this.categories = Object.keys(doc.data() as Object);
      });
  }

  setResult(result: number): void {
    this.result = result;
  }
  getResult(): number {
    return this.result;
  }

  addQuizResult(result: AttemptedQuiz) {
    this.authService.addQuizAttempt(result);
  }

  getQuizes(category: string) {
    return this.firestore
      .doc(`/quizes/${category}`)
      .collection('quizes', (ref) => ref.orderBy('name'))
      .get();
  }

  addQuiz(quiz: Quiz, category: string) {
    this.firestore
      .doc('/quizes/category')
      .update({
        [category]: null,
      })
      .catch((err) => console.log(err));
    return this.firestore.collection(`/quizes/${category}/quizes`).add(quiz);
  }

  addQuestionToQuiz(question: Question, quizName: string, category: string) {
    return this.firestore
      .collection(`quizes/${category}/quizes`, (ref) =>
        ref.where('name', '==', quizName)
      )
      .get()
      .subscribe((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No Category Found');
          return;
        }
        querySnapshot.forEach((doc) => {
          if (!doc.exists) {
            console.log('document does not exists');
            return;
          }
          doc.ref.update({
            questions: firebase.firestore.FieldValue.arrayUnion({
              question,
            }),
          });
        });
      });
  }

  getCategories() {
    // if (this.categories) return new BehaviorSubject(this.categories);
    if (this.categories) return this.categories;
    return this.firestore.doc('quizes/category').get().pipe(take(1));
  }

  getQuizById(category: string, quizId: string) {
    return this.firestore.doc(`/quizes/${category}/quizes/${quizId}`).get();
  }

  /*
   * As profile Component already fetches entire result
   * reuse the result to reduce http calls
   * if direct call entry will be null | undefined
   * in that case fetch
   */

  setHistoryEntry(entry: any) {
    this.entry = entry;
  }

  getHistoryEntry() {
    return this.entry;
  }

  checkQuizExists(quizName: string, category: string) {
    return this.firestore
      .collection(`quizes/${category}/quizes`, (ref) =>
        ref.where('name', '==', quizName)
      )
      .get();
  }
}
