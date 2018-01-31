import axios from 'axios'
import Vue from 'vue'
import Router from './router'

import { Message } from 'iview'
Vue.use(Message)

const baseURL = '/api';
Vue.prototype.$baseURL = baseURL;
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.baseURL = baseURL;
  return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data
  return response;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  Message.destroy();
  if (err && err.response) {
    switch (err.response.status) {
      case 481:
        err.message = '登录失效，请重新登陆';
        Message.warning({
          content:err.message,
          duration:3,
          onClose:function(){
            Router.push({
              path:'/'
            });
          }
        })
        break
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求错误,请稍后再试`
        break

      case 405:
        err.message = `请求错误,请稍后再试`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios