
// 扩充
import { Route } from 'vue-router'
import VueRouter from 'vue-router'
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route
  }
}
