<template>
  <div class="orders">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 搜索&添加 -->
    <el-input placeholder="请输入搜索内容" v-model="searchVal" class="search-input" @keydown.enter.native="initList">
      <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
    </el-input>
    <el-button type="primary" plain>测试订单</el-button>

    <!-- 表单 -->
    <el-table
      border
      v-loading="loading"
      class="mt-15 mb-15"
      :data="ordersData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        :width="tabWidths[0]">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        :width="tabWidths[1]">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        :width="tabWidths[2]">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="下单用户"
        :width="tabWidths[3]">
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="是否付款"
        :width="tabWidths[4]">
        <template slot-scope="scope">
          {{scope.row.pay_status | filterPay}}
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        :width="tabWidths[5]">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间">
        <template slot-scope="scope">
          {{scope.row.create_time | filterTime('-')}}
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
import {getOrderList} from '@/api'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      ordersData: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      tabWidths: [50, 260, 80, 100, 80, 80, 120, 150]
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
      console.log(this.searchVal)
      getOrderList({query: this.searchVal, pagenum: this.currentPage, pagesize: this.pageSize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.loading = false
          this.ordersData = res.data.goods
          this.totalNum = res.data.total
        }
      })
    }
  },
  filters: {
    filterPay (status) {
      if (status === '0') {
        return '已付款'
      } else {
        return '未付款'
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
.orders {
  .search-input {
    width: 300px;
  }
}
</style>
