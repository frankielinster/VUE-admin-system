// 这个文件统一处理请求
import axios from 'axios'

const URL = 'http://localhost:8888/api/private/v1/'

// 给axios设置一个全局的基准路径, 这样以后它发的所有请求都会带上这个基准路径
axios.defaults.baseURL = URL

// 定义一个请求拦截器, 用来拦截所有的请求, 里面的config参数是一个请求对象, 里面有很多属性
axios.interceptors.request.use(function (config) {
  console.log(config)
  // 先判断, 如果本地存在adminToken这个token, 我们就将token放到Request Headers中
  var token = localStorage.getItem('adminToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 返回错误的回调
  return Promise.reject(error)
})

// 定义登录请求
// 基础写法
// export const checkLogin = (params) => {
//   var data = axios.post('login', params)
//     .then(function (res) {
//     return res.data
//     })
//   return data
// }

// 精简写法01
// export const checkLogin = (params) => {
//   return axios.post('login', params).then(res => res.data)
// }

// 精简写法02
export const checkLogin = params => axios.post('login', params).then(res => res.data)

// 定义获取用户信息界面请求
export const getUserList = obj => axios.get('users', {params: obj}).then(res => res.data)
