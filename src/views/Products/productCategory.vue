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
              :props="props"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCategoryDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddCate">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑分类对话框 -->
      <el-dialog title="添加分类" :visible.sync="editCategoryDialogFormVisible">
        <el-form :model="editForm" :rules="rules" ref="edittCategoryForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
            <el-input v-model="editForm.cat_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCategoryDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEditCate('edittCategoryForm')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategories, addCategories, delCategory, getCategoryById, editCategoryName} from '@/api'
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
      formLabelWidth: '80px',
      options: [], // 联级选择器数据
      selectedOptions: [], // 选中的组
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      addCategoryDialogFormVisible: false,
      editCategoryDialogFormVisible: false,
      addForm: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      editForm: {
        cat_name: '',
        cat_id: '',
        cat_pid: ''
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
      // console.log(cid)
      delCategory(cid).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    editCategory (cid) {
      console.log(cid)
      getCategoryById(cid).then(res => {
        console.log(res)
        this.editForm.cat_name = res.data.cat_name
        this.editForm.cat_id = res.data.cat_id
        this.editForm.cat_pid = res.data.cat_pid
        console.log(this.editForm)
        this.editCategoryDialogFormVisible = true
      })
    },
    submitEditCate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editCategoryName(this.editForm).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.editCategoryDialogFormVisible = false
              this.$message.success(res.meta.msg)
              this.initList()
              // this.dataSource = res.data
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        } else {
          this.$message.error('数据校验失败, 请检验重试')
          return false
        }
      })
    },
    initList () {
      getCategories({type: 3, pagenum: this.currentPage, pagesize: this.pageSize}).then(res => {
        // console.log(res)
        this.loading = false
        res.data.result.forEach(item => {
          // console.log(item)
          if (item.cat_deleted === false) {
            item.cat_deleted = '有效'
          } else {
            item.cat_deleted = '无效'
          }
          if (item.children && item.children.length !== 0) {
            item.children.forEach(secondItem => {
              if (secondItem.cat_deleted === false) {
                secondItem.cat_deleted = '有效'
              } else {
                secondItem.cat_deleted = '无效'
              }
              // console.log(secondItem)
              if (secondItem.children && secondItem.children.length !== 0) {
                secondItem.children.forEach(thirdItem => {
                  if (thirdItem.cat_deleted === false) {
                    thirdItem.cat_deleted = '有效'
                  } else {
                    thirdItem.cat_deleted = '无效'
                  }
                })
              }
            })
          }
        })
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
    handleChange (val) {
      console.log(val)
      this.addForm.cat_pid = val[val.length - 1]
      this.addForm.cat_level = val.length
    },
    showAddDialog () {
      getCategories({type: 2}).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.addCategoryDialogFormVisible = true
          this.options = res.data
        }
      })
    },
    submitAddCate () {
      console.log(this.addForm)
      addCategories(this.addForm).then(res => {
        console.log(res)
        // 1. 如果一个父节点都没有选中, name这个cat_pid和cat_level都是0
        // 2. 如果选择的只有一级父节点, 也就是你要创造二级节点的话, 那么这个cat_pid就是在change事件中打印出来的数组的最后一项, 这个cat_level就是1
        // 3. 如果选中的是二级节点, 也就是你要创造的是三级节点的话, 那么这个cat_pid就是change事件中打印出来的数组的最后一项, 这个cat_level就是2
        if (res.meta.status === 201) {
          this.addCategoryDialogFormVisible = false
          this.initList()
          this.addForm.cat_name = ''
          this.options = []
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    }
  }
}
</script>
