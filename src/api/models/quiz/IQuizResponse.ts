/* eslint-disable camelcase */

export default interface IQuizResponse {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'hard' | 'easy' | 'medium';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
