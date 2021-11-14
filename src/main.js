import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import font icons
import './assets/fonts/iconfont.css'
// import global stylesheet
import './assets/css/global.css'

import axios from 'axios'
// set the root path of request
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
