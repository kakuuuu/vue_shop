import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
