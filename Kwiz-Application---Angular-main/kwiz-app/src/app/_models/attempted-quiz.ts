export class AttemptedQuiz {
  constructor(
    public quizId: string,
    public category: string,
    public answers: number[], // if answer[i] == -1 means not attempted by user
    public score: number,
    public date: Date
  ) {}
}
