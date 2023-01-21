import { Question } from './question';

export interface Quiz {
  name: string;
  category: string;
  level: number;
  questions: Question[];
}
