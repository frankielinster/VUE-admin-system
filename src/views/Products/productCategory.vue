<template>
  <div class="productCategory">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-button type="primary" plain @click="showAddDialog">添加分类</el-button>

    <tree-grid
      v-loading="loading"
      class="mt-15 mb-15"
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>

    <!-- 分页器 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

      <!-- 添加分类对话框 -->
      <el-dialog title="添加分类" :visible.sync="addCategoryDialogFormVisible">
        <el-form :model="addForm" :rules="rules">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
            <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级名称" :label-width="formLabelWidth">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              placeholder="请选择分类"
              expand-trigger="hover"
              :change-on-select="false"
              :show-all-levels="false"
              :props="selfDefineAttr"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCategoryDialogFormVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCaregories} from '@/api'
export default {
  components: {
    TreeGrid
  },
  data () {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      formLabelWidth: '120px',
      options: [], // 联级选择器数据
      selectedOptions: [], // 选中的组
      selfDefineAttr: {
        value: 'cat_id',
        label: 'cat_name'
      },
      addCategoryDialogFormVisible: false,
      addForm: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    initList () {
      getCaregories({type: 3, pagenum: this.currentPage, pagesize: this.pageSize}).then(res => {
        // console.log(res)
        this.loading = false
        this.dataSource = res.data.result
        this.totalNum = res.data.total
      })
    },
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
    handleChange () {
      console.log(123)
      getCaregories({type: 3}).then(res => {
        console.log(res)
        this.options = res.data
      })
    },
    showAddDialog () {
      this.addCategoryDialogFormVisible = true
      getCaregories({type: 3}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
