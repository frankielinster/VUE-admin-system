<template>
  <div class="productList">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 搜索&添加 -->
    <el-input placeholder="请输入搜索内容" v-model="searchVal" class="search-input" @keydown.enter.native="initList">
      <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
    </el-input>
    <el-button type="primary" plain>添加商品</el-button>

    <!-- 表单 -->
    <el-table
      border
      v-loading="loading"
      class="mt-15 mb-15"
      :data="productsData"
      style="width: 100%">
      <el-table-column
        :width="tabWidths[0]"
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        :width="tabWidths[1]"
        prop="goods_name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        :width="tabWidths[2]"
        prop="goods_price"
        label="商品价格">
      </el-table-column>
      <el-table-column
        :width="tabWidths[3]"
        prop="goods_state"
        label="商品状态">
        <template slot-scope="scope">
          {{scope.row.goods_state | filterState}}
        </template>
      </el-table-column>
      <el-table-column
        :width="tabWidths[4]"
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        :width="tabWidths[5]"
        prop="add_time"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.add_time | filterTime("-")}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" icon="el-icon-edit" type="primary" plain></el-button>
          <el-button
            size="mini" icon="el-icon-delete" type="danger" plain></el-button>
          <el-button
            size="mini" icon="el-icon-check" type="warning" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
import {getProductCategories} from '@/api'
export default {
  data () {
    return {
      searchVal: '',
      productsData: [],
      loading: true,
      tabWidths: [50, 350, 80, 80, 100, 130, 260],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0
    }
  },
  created () {
    this.initList()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.initList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.initList()
    },
    initList () {
      getProductCategories({query: this.searchVal, pagenum: this.currentPage, pagesize: this.pageSize}).then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.loading = false
          this.productsData = res.data.goods
          this.totalNum = res.data.total
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    }
  },
  filters: {
    filterState (state) {
      // console.log(state)
      if (state === 0) {
        return '未通过'
      } else if (state === 1) {
        return '审核中'
      } else {
        return '已审核'
      }
    },
    filterTime (time, seprator) {
      // console.log(time)
      var val = new Date(time)
      var y = val.getFullYear()
      var m = val.getMonth() + 1
      var d = val.getDate()
      return y + seprator + m + seprator + d
    }
  }
}
</script>

<style lang="scss" scoped>
.productList {
  .search-input {
    width: 300px;
  }
}
</style>
