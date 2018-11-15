/**
 * demo
 *
 * @author: Storm
 * @date: 2018/11/14
 */

import Main from '../views/demo/Main.vue'

export default {
  name: 'example',
  path: '/example',
  component: Main,
  redirect: { name: 'RDemoInput' },
  children: [
    {
      name: 'exampleInput',
      path: 'input',
      component: () => import('../views/demo/Input.vue')
    },
    {
      name: 'exampleCrud',
      path: 'crud',
      component: () => import('../views/demo/crud.vue')
    }
  ]
}
