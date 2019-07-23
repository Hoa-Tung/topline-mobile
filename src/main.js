import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import relativeTime from './filters/relative-time'

import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
// import { reject } from 'q'

// 注册一个全局过滤器：处理相对时间
Vue.filter('relativeTime', relativeTime)

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
