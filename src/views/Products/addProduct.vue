<template>
  <div class="addProduct">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'productlist' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'productlist' }">商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="title">添加商品信息</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-steps :active="1" align-center finish-status="success">
          <el-step title="步骤1"></el-step>
          <el-step title="步骤2"></el-step>
          <el-step title="步骤3"></el-step>
          <el-step title="步骤4"></el-step>
          <el-step title="步骤5"></el-step>
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.title {
  height: 45px;
  line-height: 45px;
  background-color: #D7E2EF;
  padding-left: 20px;
}
.el-tabs .el-tab-pane {
  padding-right: 20px;
}
.el-steps {
  margin: 15px 0px;
  padding-left: 20px;
}
.footer {
  margin-top: 10px;
  text-align: center;
}
</style>
