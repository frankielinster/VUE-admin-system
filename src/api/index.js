// 这个文件统一处理请求
import axios from 'axios'

const URL = 'http://localhost:8888/api/private/v1/'

// 给axios设置一个全局的基准路径, 这样以后它发的所有请求都会带上这个基准路径
axios.defaults.baseURL = URL

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
