import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import QuizView from '../views/QuizView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'quiz',
    component: QuizView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
