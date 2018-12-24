/**
 * demo
 *
 * @author: Storm
 * @date: 2018/11/14
 */

import Main from '../views/example/Main.vue'

export default {
  name: 'example',
  path: '/example',
  component: Main,
  redirect: { name: 'exampleInput' },
  children: [
    {
      name: 'exampleInput',
      path: 'input',
      component: () => import('../views/example/Input.vue')
    },
    {
      name: 'exampleCrud',
      path: 'crud',
      component: () => import('../views/example/crud.vue')
    },
    {
      name: 'exampleGrid',
      path: 'grid',
      component: () => import('../views/example/grid.vue')
    },
    {
      name: 'exampleCharts',
      path: 'charts',
      component: () => import('../views/example/charts.vue')
    },
    {
      name: 'exampleTab',
      path: 'tab',
      component: () => import('../views/example/tab.vue')
    }
  ]
}
