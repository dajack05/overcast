import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterUserView.vue')
    },
    {
      path: '/register_group',
      name: 'register_group',
      component: () => import('../views/RegisterGroup.vue')
    },
    {
      path: '/email',
      name: 'email',
      component: () => import('../views/EmailView.vue')
    },
  ]
})

export default router
