import { AttemptedQuiz } from './attempted-quiz';

export class User {
  uid: string; // The user's unique ID
  attemptedQuizes: AttemptedQuiz[] = [];
  isAdmin:boolean = false;

  constructor(uid: string) {
    this.uid = uid;
  }
}
