/**
 * axios
 *
 * author: Storm
 * date: 2017/09/19
 */

import Vue from 'vue'
import axios from 'axios'
import encodeURI from '../utils/encodeURI'

let serialize

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_URL,
  timeout: 120000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-zq-from-app': process.env.VUE_APP_X_ZQ_FROM_APP
  },
  transformRequest: [(data) => {
    if (!(data instanceof Object) || (data instanceof FormData)) return data
    if (serialize === false) {
      return JSON.stringify(data)
    }
    let ret = ''
    for (let it in data) {
      if (!data.hasOwnProperty(it) || data[it] === undefined || data[it] === null || Number.isNaN(data[it])) continue
      if (serialize === false) {
        ret += data[it]
        continue
      }
      ret += encodeURI(it) + '='
      switch (typeof data[it]) {
        case 'object':
          ret += encodeURI(JSON.stringify(data[it]))
          break
        case 'string':
          ret += encodeURI(data[it])
          break
        default:
          ret += data[it]
          break
      }
      ret += '&'
    }
    ret = ret.replace(/&$/, '')
    return ret
  }]
})

// 请求拦截器
instance.interceptors.request.use((config = {}) => {
  serialize = config.serialize
  if (config.json) {
    config.headers['Content-Type'] = 'application/json'
    serialize = false
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  const data = response.data

  if (!(data instanceof Object)) {
    return data
  }

  if (('success' in data && data.success === false) || data.errorCode) {
    Vue.prototype.$message.danger(data.info || data.code || data.errorMsg || data.errorCode || '服务器错误, 请重试!')

    // 当用户未登录时, 自动跳转到登录页面
    if (data.errorCode === 'noLogin' && !location.pathname.includes('login')) {
      const { search, pathname } = location
      location.href = `/login?redirect=` + encodeURI(`${pathname}${search}`)
    }
    return Promise.reject(response)
  }

  if (data.success) {
    return data.data
  }

  return data
}, error => {
  Vue.prototype.$message.danger(error.message)
  return Promise.reject(error)
})

Vue.prototype.$http = instance

export default instance
