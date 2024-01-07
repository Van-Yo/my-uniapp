import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import 'uni.scss'
Vue.use(uView)
import {router} from '@/router/index.js'  //路径换成自己的
Vue.use(router)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif