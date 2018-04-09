import axios from 'axios'
import router from 'vue-router'
import { removeStore } from '@/utils/storage'
// 创建axios实例
const fetch = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
fetch.interceptors.request.use(config => {
  // 让每个请求携带token
  const token = sessionStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
fetch.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          sessionStorage.removeItem('token')
          removeStore('buyCart')
          router.push({
            path: '/login'
          })
      }
    }

    return Promise.reject(error)
  })

export default fetch
