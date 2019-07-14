import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(VeeValidate, {
  events: ''
})
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
