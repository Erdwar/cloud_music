import axios from 'axios'
// import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'https://service-3y938xla-1314393798.nj.tencentapigw.com/release/',
  timeout: 2000,
  withCredentials: true
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    if (config.method === 'post') {
      config.url += `?tm=${new Date().getTime()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (res: any) => {
    if (res.status && res.status === 200) {
      return res.data
    }
    ElMessage({ message: res.msg || res.statusText || '请求失败', type: 'warning' })
    return Promise.reject(res)
  },
  (error: any) => {
    if (error.response) {
      const res = error.response
      ElMessage({ message: res, type: 'error' })
    } else {
      ElMessage({ message: '请检查网络连接状态', type: 'error' })
    }
    return Promise.reject(error.response)
  }
)

export default request
