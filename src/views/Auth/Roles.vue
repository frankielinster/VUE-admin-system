<template>
  <div class="roles">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-button type="primary" plain>添加用户</el-button>

    <el-table
    border
    class="mt-15 mb-15"
    :data="rolesList"
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          Here to add something
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" icon="el-icon-edit" plain type="primary"></el-button>
          <el-button
            size="mini" icon="el-icon-delete" plain type="danger"></el-button>
          <el-button
            size="mini" icon="el-icon-check" plain type="warning"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRolesList } from '@/api'
export default {
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRolesList().then(res => {
        // console.log(res)
        this.rolesList = res.data
      })
    }
  }
}
</script>
