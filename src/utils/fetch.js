import axios from 'axios'

// 创建axios实例
const fetch = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
fetch.interceptors.request.use(config => {
  // 让每个请求携带token--['token']为自定义key
  const token = sessionStorage.getItem('token')
  // config.headers['X-Token']=token
  config.headers.Authorization = `token ${token}`
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
    console.log('err' + error)
    this.$message({
      message: '服务器繁忙，请稍后再试',
      type: 'error',
      duration: 2000
    })

    return Promise.reject(error)
  })

export default fetch
