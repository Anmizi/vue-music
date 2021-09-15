import axios from 'axios'

// 进行全局配置
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 3000

// 封装get/post方法

export default {
  get: function (path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then((response) => {
          resolve(response)
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
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
