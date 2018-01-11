// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios';
import app from './axios.config';

const transformRequest = function (data) {
  let ret = ''
  for (let it in data) {
  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
  return ret
}

Vue.prototype.$http = axios;
Vue.prototype.$transformRequest = transformRequest;
Vue.use(iView);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
