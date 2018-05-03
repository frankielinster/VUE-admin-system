<template>
  <div class="user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="searchVal" class="search-input">
      <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
    </el-input>
    <el-button type="primary" @click="addDialogFormVisible=!addDialogFormVisible">添加用户</el-button>

    <el-table
      class="mt-15 mb-15"
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddUser('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :label-width="formLabelWidth" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddUser('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getUserList, changeUserState, addUser} from '@/api'
export default {
  data () {
    return {
      searchVal: '',
      userList: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      formLabelWidth: '80px',
      addDialogFormVisible: false, // 添加用户对话框的隐藏与显示
      editDialogFormVisible: false, // 编辑用户对话框的隐藏与显示
      // 添加的表单对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editFrom: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 这是自定义校验规则的写法
        // email: [
        //   {required: true, validator: checkEmail, trigger: 'blur'}
        // ],
        // 下面这种写法需要element-ui@2.2.2版本，最新版本不支持
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getUserList({query: this.searchVal, pagenum: this.currentPage, pagesize: this.pageSize}).then(res => {
        console.log(res.data)
        if (res.meta.status === 200) {
          this.totalNum = res.data.total
          this.userList = res.data.users
          this.searchVal = ''
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.initList()
    },
    changeState (row) {
      console.log(row)
      changeUserState({uid: row.id, type: row.mg_state}).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('更改用户状态成功')
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    submitAddUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.addDialogFormVisible = false
              this.$message.success('更改用户状态成功')
              this.initList()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        } else {
          this.$message.error('校验不通过, 请重新填写')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
}
</style>
