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

    <el-button type="primary" plain>添加角色</el-button>

    <el-table
    v-loading="loading"
    border
    class="mt-15 mb-15"
    :data="rolesList"
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">

          <el-row v-for="(firstItem,index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag closable>{{firstItem.authName}}</el-tag>
              <i class="el-icon-caret-right" v-if="firstItem.authName.length !== 0"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(secondItem,index) in firstItem.children" :key="index">
                <el-col :span="4">
                  <el-tag closable type= 'success'>{{secondItem.authName}}</el-tag>
                  <i class="el-icon-caret-right" v-if="secondItem.authName.length !== 0"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag closable type= 'warning'  v-for="(thirdItem,index) in secondItem.children" :key="index">{{thirdItem.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">该角色未分配功能, 请前往分配</el-col>
          </el-row>

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
      loading: true,
      rolesList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRolesList().then(res => {
        console.log(res)
        this.loading = false
        this.rolesList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.roles {
  .el-tag {
    margin: 5px 5px 5px 0;
  }
  .tree-container {
    height: 300px;
    overflow: auto;
  }
}
</style>
