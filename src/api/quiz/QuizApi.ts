import axios from 'axios'
import mapper from '@/api/quiz/Mapper'
import IQuizResponse from '@/api/models/quiz/IQuizResponse'

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.digi-quiz.hetrodo.dev' : `http://${window.location.hostname}:3000`

const quizApi = axios.create({
  baseURL: baseUrl
})

export default {
  GET_QUIZ: async (quizId: number) => (await quizApi.get<IQuizResponse[]>(`quiz/${quizId}`)).data.map(mapper.MAP_QUIZ_RESPONSE_TO_QUIZ)
}
