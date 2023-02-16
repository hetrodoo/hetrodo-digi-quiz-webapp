import { createStore } from 'vuex'
import QuizApi from '@/api/quiz/QuizApi'

export default createStore({
  state: {
    questions: [],
    currentQuestion: -1,
    isLoading: false
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
        store.dispatch('RESET')
        return
      }

      store.commit('SET_CURRENT_QUESTION', store.getters.GET_CURRENT_QUESTION_INDEX + 1)
    }
  },
  modules: {
  }
})
