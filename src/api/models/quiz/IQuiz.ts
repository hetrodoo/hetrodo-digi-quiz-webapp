export default interface IQuiz {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'hard' | 'easy' | 'medium';
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}
