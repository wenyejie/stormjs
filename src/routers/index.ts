import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'rHome',
      component: () => import('../views/Home.vue')
    }, {
      path: '/login',
      name: 'rLogin',
      component: () => import('../views/login.vue')
    },

    {
      path: '/demo',
      name: 'rDemo',
      component: () => import('../views/demo.vue')
    }, {
      path: '*',
      name: 'r404',
      component: () => import('../views/404.vue')
    }
  ]
})
