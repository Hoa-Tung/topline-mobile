import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 配置路由
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
