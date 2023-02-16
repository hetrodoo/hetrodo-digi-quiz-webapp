/* eslint-disable camelcase */

import IQuizResponse from '@/api/models/quiz/IQuizResponse'
import IQuiz from '@/api/models/quiz/IQuiz'

export default {
  MAP_QUIZ_RESPONSE_TO_QUIZ: (response: IQuizResponse): IQuiz => {
    return {
      category: response.category,
      correctAnswer: response.correct_answer,
      difficulty: response.difficulty,
      incorrectAnswers: response.incorrect_answers,
      question: response.question,
      type: response.type
    }
  }
}
