<template>
  <div class="login">
    <!-- 这里只能有一个根节点 -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="container">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName" prefix-icon="myicon myicon-user" @keyup.enter.native="login('loginForm')" autofocus></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input v-model="loginForm.userPwd" prefix-icon="myicon myicon-key" type="password" @keyup.enter.native="login('loginForm')"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="login('loginForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {checkLogin} from '@/api'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        userPwd: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      // validate()是一个校验函数, 它里面跟一个带参数的函数作为参数, 这个函数的参数是一个布尔值, 为true表示通过校验
      this.$refs[loginForm].validate((result) => {
        if (result) {
          checkLogin({username: this.loginForm.userName, password: this.loginForm.userPwd})
            .then(res => {
              // console.log(123)
              if (res.meta.status === 200) {
                // 跳转到首页, 保存服务器返回的token
                console.log(res)
                localStorage.setItem('adminToken', res.data.token)
                this.$router.push({name: 'home'})
                // 将username存储到vuex的state中
                this.$store.commit('setUserName', res.data.username)
              } else {
                this.$message.error(res.meta.msg)
              }
            })
        } else {
          return false
        }
      })
      // checkLogin({username: this.loginForm.userName, password: this.loginForm.userPwd})
      //   .then(res => {
      //     // console.log(123)
      //     if (res.meta.status === 200) {
      //       console.log(res.meta)
      //       this.$router.push({name: 'home'})
      //     } else {
      //       this.$message.error(res.meta.msg)
      //     }
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 40px 40px;
    margin: 200px auto;
    background: white;
    border-radius: 5px;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
