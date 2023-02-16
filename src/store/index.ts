import { createStore } from 'vuex'
import QuizApi from '@/api/quiz/QuizApi'

export default createStore({
  state: {
    questions: [],
    currentQuestion: -1,
    isLoading: false,
    correctAnswersCount: 0
  },
  getters: {
    GET_QUESTIONS (state) {
      return state.questions
    },
    GET_CURRENT_QUESTION (state) {
      if (state.currentQuestion === -1 || state.questions.length <= 0) {
        return null
      }

      return state.questions[state.currentQuestion]
    },
    GET_CURRENT_QUESTION_INDEX (state) {
      return state.currentQuestion
    },
    GET_CORRECT_ANSWERS_COUNT (state) {
      return state.correctAnswersCount
    }
  },
  mutations: {
    SET_QUESTIONS (state, questions) {
      state.questions = questions
    },
    SET_CURRENT_QUESTION (state, currentQuestion) {
      state.currentQuestion = currentQuestion
    },
    SET_IS_LOADING (state, isLoading) {
      state.isLoading = isLoading
    },
    SET_CORRECT_ANSWERS_COUNT (state, count) {
      state.correctAnswersCount = count
    }
  },
  actions: {
    RESET (store) {
      store.commit('SET_IS_LOADING', false)
      store.commit('SET_QUESTIONS', [])
      store.commit('SET_CURRENT_QUESTION', 0)
    },
    async LOAD_QUIZ (store, quizId) {
      try {
        store.dispatch('RESET')
        store.commit('SET_IS_LOADING', true)
        store.commit('SET_QUESTIONS', await QuizApi.GET_QUIZ(quizId))
        store.commit('SET_CURRENT_QUESTION', 0)
      } catch (e) {
        console.error(e)
      } finally {
        store.commit('SET_IS_LOADING', false)
      }
    },
    NEXT_QUESTION (store) {
      if ((store.getters.GET_CURRENT_QUESTION_INDEX + 1) === store.getters.GET_QUESTIONS.length) {
        return false
      }

      store.commit('SET_CURRENT_QUESTION', store.getters.GET_CURRENT_QUESTION_INDEX + 1)
      return true
    },
    ADD_CORRECT_ANSWER (store) {
      store.commit('SET_CORRECT_ANSWERS_COUNT', store.getters.GET_CORRECT_ANSWERS_COUNT + 1)
    }
  },
  modules: {
  }
})
