import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'RHome',
      component: () => import('../views/Home.vue')
    }, {
      path: '/login',
      name: 'RLogin',
      component: () => import('../views/login.vue')
    },

    {
      path: '/demo',
      name: 'RDemo',
      component: () => import('../views/demo.vue')
    }, {
      path: '*',
      name: 'R404',
      component: () => import('../views/404.vue')
    }
  ]
})
