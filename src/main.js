import Vue from 'vue'
import './styles'
import App from './App.vue'
import router from './routers'
import components from './components'
import { sUserInfo, sUserPermission } from './storages'

Vue.config.productionTip = false

Vue.use(components)

const userInfo = sUserInfo()

new Vue({
  router,
  data () {
    return {
      isLogin: userInfo && sUserPermission(),
      userInfo
    }
  },
  render: h => h(App)
}).$mount('#app')
