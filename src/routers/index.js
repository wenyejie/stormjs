import Vue from 'vue'
import Router from 'vue-router'
import demo from './demo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'RHome',
      component: () => import('../views/Home.vue')
    },

    demo,

    {
      path: '/login',
      name: 'RLogin',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/demo',
      name: 'RDemo',
      component: () => import('../views/Demo.vue')
    },
    {
      path: '*',
      name: 'R404',
      component: () => import('../views/404.vue')
    }
  ]
})
