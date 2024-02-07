import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '@/views/UserLogin.vue'
import HomePage from '@/views/HomePage.vue'
import LoginCallback from '@/views/LoginCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage
    },
    {
      name: 'login',
      path: '/login',
      component: UserLogin,
      props: (route) => route.query
    },
    {
      name: 'loginCallback',
      path: '/login-callback',
      component: LoginCallback
    }
  ]
})

export default router
