// 这个文件统一处理请求
import axios from 'axios'

const URL = 'http://localhost:8888/api/private/v1/'

// 给axios设置一个全局的基准路径, 这样以后它发的所有请求都会带上这个基准路径
axios.defaults.baseURL = URL

// 定义一个请求拦截器, 用来拦截所有的请求, 里面的config参数是一个请求对象, 里面有很多属性
axios.interceptors.request.use(function (config) {
  // console.log(config)
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

// 左侧菜单权限
export const getLeftMenus = () => axios.get('menus').then(res => res.data)

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
export const getUserList = obj => axios.get('users', { params: obj }).then(res => res.data)

// 改变用户状态
export const changeUserState = obj => axios.put(`users/${obj.uid}/state/${obj.type}`).then(res => res.data)

// 添加用户
export const addUser = obj => axios.post('users', obj).then(res => res.data)

// 编辑用户
export const editUser = obj => axios.put(`users/${obj.id}`, {email: obj.email, mobile: obj.mobile}).then(res => res.data)

// 删除用户
export const delUser = id => axios.delete(`users/${id}`).then(res => res.data)

// 获取角色列表
export const getRolesList = () => axios.get('roles').then(res => res.data)

// 提交角色编辑列表
export const grantUser = obj => axios.put(`users/${obj.id}/role`, {rid: obj.rid}).then(res => res.data)

// Rights.vue
// 获取权限列表
export const getRightList = obj => axios.get(`rights/${obj.type}`).then(res => res.data)

// Roles.vue
// 添加角色
export const addRole = obj => axios.post('roles', obj).then(res => res.data)

// 编辑角色
export const editRole = obj => axios.put(`roles/${obj.id}`, obj).then(res => res.data)

// 删除角色
export const delRole = id => axios.delete(`roles/${id}`).then(res => res.data)

// 删除角色权限
export const delRoleRight = obj => axios.delete(`roles/${obj.roleId}/rights/${obj.rightId}`).then(res => res.data)

// 授权角色权限
export const grant = obj => axios.post(`roles/${obj.roleId}/rights`, {rids: obj.rids}).then(res => res.data)

// productList.vue
// 获取商品数据列表
export const getProductCategories = obj => axios.get('goods', { params: obj }).then(res => res.data)

// productCategory.vue
// 获取商品分类数据
export const getCategories = obj => axios.get('categories', { params: { type: obj.type, pagenum: obj.pagenum, pagesize: obj.pagesize } }).then(res => res.data)

// 删除商品分类
export const delCategory = id => axios.delete(`categories/${id}`).then(res => res.data)

// 编辑商品分类名称
export const editCategoryName = obj => axios.put(`categories/${obj.cat_id}`, obj).then(res => res.data)

// 根据id获取分类数据
export const getCategoryById = id => axios.get(`categories/${id}`).then(res => res.data)

// 提交添加分类功能
export const addCategories = obj => axios.post('categories', obj).then(res => res.data)

// orders.vue
// 获取订单列表
export const getOrderList = obj => axios.get('orders', {params: obj}).then(res => res.data)
