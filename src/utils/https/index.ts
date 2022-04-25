// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '../../router'

const service = axios.create({
  // 联调
  baseURL: '/',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  // 是否跨站点访问控制请求
  //   withCredentials: true,
  timeout: 300000,
  // transformRequest: [
  //   (data) => {
  //     data = JSON.stringify(data)
  //     return data
  //   },
  // ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  // transformResponse: [
  //   (data) => {
  //     if (typeof data === 'string' && data.startsWith('{')) {
  //       data = JSON.parse(data)
  //     }
  //     return data
  //   },
  // ],
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    //获取token，并将其添加至请求头中
    let token = localStorage.getItem('token')
    config.headers.ACCESS_TOKEN = `${token}`
    return config
  },
  (error) => {
    return Promise.resolve(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    let {code} = response.data
    if(code == 401){
      localStorage.removeItem('token')
      router.push({
        name:'login'
      })
    }
    console.log(response.data)
    return response.data
  },
  (error) => {
    if (axios.isCancel(error)) {
    } else {
      // 错误抛到业务代码
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    }
    return Promise.reject(error)
  }
)

export default service
