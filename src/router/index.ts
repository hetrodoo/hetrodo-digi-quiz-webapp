import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import QuizView from '../views/QuizView.vue'
import ResultView from '../views/ResultView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'quiz',
    component: QuizView
  },
  {
    path: '/result/:percentage',
    name: 'result',
    component: ResultView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
