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

    <el-button type="primary" plain @click="addDialogFormVisible = !addDialogFormVisible">添加角色</el-button>

    <el-table
    @expand-change="selectRole"
    v-loading="loading"
    border
    class="mt-15 mb-15"
    :data="rolesList"
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">

          <el-row v-for="(firstItem,index) in scope.row.children" :key="index">
            <el-col :span="3">
              <el-tag closable>{{firstItem.authName}}</el-tag>
              <i class="el-icon-caret-right" v-if="firstItem.authName.length !== 0"></i>
            </el-col>
            <el-col :span="21">
              <el-row class="underLine" v-for="(secondItem,index) in firstItem.children" :key="index">
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
            size="mini" icon="el-icon-edit" plain type="primary" @click="edit(scope.row)"></el-button>
          <el-button
            size="mini" icon="el-icon-delete" plain type="danger" @click="del(scope.row)"></el-button>
          <el-button
            size="mini" icon="el-icon-check" plain type="warning" @click="editTree(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="formLabelWidth" :rules="rules" ref="addRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddRole('addRoleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :label-width="formLabelWidth" :rules="rules" ref="editRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off" autofocus></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditRole('editRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRolesList, addRole, editRole, delRole} from '@/api'
export default {
  data () {
    return {
      loading: true,
      rolesList: [],
      formLabelWidth: '80px',
      currentRole: '',
      addDialogFormVisible: false, // 添加角色对话框显示与隐藏
      editDialogFormVisible: false, // 添加角色对话框显示与隐藏
      // 添加的表单对象
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRolesList().then(res => {
        // console.log(res)
        this.loading = false
        this.rolesList = res.data
      })
    },
    submitAddRole (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.addDialogFormVisible = false
              this.$message.success('添加角色成功')
              this.initList()
            } else {
              this.$message.error('添加角色失败')
            }
          })
        } else {
          this.$message.error('数据校验失败, 请检验重试')
          return false
        }
      })
    },
    edit (row) {
      console.log(row)
      this.editDialogFormVisible = true
      this.editForm.roleName = row.roleName
      this.editForm.roleDesc = row.roleDesc
      this.editForm.id = row.id
    },
    submitEditRole (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editRole(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.editDialogFormVisible = false
              this.$message.success('编辑角色成功')
              this.initList()
            } else {
              this.$message.error('编辑角色失败')
            }
          })
        } else {
          this.$message.error('数据校验失败, 请检验重试')
          return false
        }
      })
    },
    del (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(row.id).then(res => {
          this.$message.success('删除角色成功')
          this.initList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectRole (row) {
      // console.log(row)
    },
    editTree (row) {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        // dangerouslyUseHTMLString: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.roles {
  .underLine {
    border-top: solid 1px #D3DCE6;
  }
  .el-row:last-child .underLine{
    border-bottom: solid 1px #D3DCE6;
  }
  .el-tag {
    margin: 5px 5px 5px 0;
  }
  .tree-container {
    height: 300px;
    overflow: auto;
  }
}
</style>
