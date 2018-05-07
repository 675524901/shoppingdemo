import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
// 创建axios实例
const fetch = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
fetch.interceptors.request.use(async config => {
  // 让每个请求携带token
  const token = await sessionStorage.getItem('token')
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
fetch.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else if (res.code === 500) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else return response
  },
  async error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
      }
    }
    return Promise.reject(error)
  })

export default fetch
