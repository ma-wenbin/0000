import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/unit.css'

import vueAxios from 'vue-axios'
import axios from 'axios'
import interceptor from '@/plugins/interceptors.js'
import VueLocalStorage from 'vue-localstorage'
// Vue.localStorage.get(key),Vue.localStorage.set(key,value),Vue.localStorage.remove(key),Vue.localStorage.clear()

Vue.use(VueLocalStorage)


import Router from 'vue-router'
// 解决同一路由反复点击报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(vueAxios, axios)
Vue.use(interceptor, router)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
