import Vue from 'vue'
import Router from 'vue-router'
import example from './example'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },

    example,

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})
