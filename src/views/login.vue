<template>
  <div class="login">
    <!-- 这里只能有一个根节点 -->
    <el-form ref="loginForm" :model="loginForm" class="container">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.userName" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.userPwd" prefix-icon="myicon myicon-key"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn">确定</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        userPwd: ''
      }
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
