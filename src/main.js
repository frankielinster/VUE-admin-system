// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import VueQuillEditor from 'vue-quill-editor' // 引入富文本编辑器
import ECharts from 'vue-echarts' // 引入数据图模块

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css' // 引入富文本编辑器的样式

Vue.use(VueQuillEditor /* { default global options } */) // 挂载富文本编辑器

Vue.component('chart', ECharts) // 全局引入ECharts

// 关闭生产模式下给出的提示
Vue.config.productionTip = false
// 启用elementUI
Vue.use(ElementUI)

// 添加路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('adminToken')
  if (token) {
    // console.log(to)
    // console.log(from)
    // 如果登录了就继续执行下一步
    next()
  } else {
    // 没有登录且访问路径为login则继续访问
    if (to.path === '/login') {
      next()
    } else {
      // 没有登录且访问路径不为login则执行以下操作
      // 此处无法使用this.$router.push()方法
      next({ path: '/login' })
    }
  }
})

/* eslint-disable no-new */
// 這句注釋可以繞過規則檢測
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
