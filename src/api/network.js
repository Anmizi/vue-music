import axios from 'axios'
import Vue from 'vue'

// 进行全局配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 3000
// 添加请求拦截器
let count = 0
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 封装get/post方法

export default {
  get: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(path, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise((resolve, reject) => {
      axios.all(list)
        .then(axios.spread((...result) => {
          resolve(result)
        }))
        .catch((error) => {
          reject(error)
        })
    })
  }
}
