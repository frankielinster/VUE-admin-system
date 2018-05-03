<template>
  <div class="rigths">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      class="mt-15 mb-15"
      :data="rightList"
      border
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限管理">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          {{scope.row.level | filterLevel}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRightList } from '@/api'
export default {
  data () {
    return {
      loading: true,
      rightList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRightList({type: 'list'}).then(res => {
        console.log(res)
        this.loading = false
        this.rightList = res.data
      })
    }
  },
  filters: {
    filterLevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  }
}
</script>
