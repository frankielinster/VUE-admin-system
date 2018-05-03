import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/User/user'
import Welcome from '@/views/Welcome/welcome.vue'
import Rights from '@/views/Auth/Rights.vue'
import Roles from '@/views/Auth/Roles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'user',
          path: 'user',
          component: User
        },
        {
          name: 'rights',
          path: 'rights',
          component: Rights
        },
        {
          name: 'roles',
          path: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
