import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 全局 axios
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

// import moment from 'moment' //导入文件
// Vue.prototype.$moment = moment; //赋值使用

// 全局过滤
import {
  timeFun
} from '../src/filters/index'
Vue.filter('time', timeFun)


if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
