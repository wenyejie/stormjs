/**
 * demo
 *
 * @author: Storm
 * @date: 2018/11/14
 */

import Main from '../views/demo/Main.vue'

export default {
  name: 'RDemo',
  path: '/demo',
  component: Main,
  redirect: { name: 'RDemoInput' },
  children: [
    {
      name: 'RDemoInput',
      path: 'input',
      component: () => import('../views/demo/Input.vue')
    }
  ]
}
