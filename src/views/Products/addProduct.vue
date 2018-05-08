<template>
  <div class="addProduct">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'goods' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'goods' }">商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="title">添加商品信息</div>
      </el-col>
    </el-row>

      <!-- 步骤条 -->
    <el-row>
      <el-col :span="24">
        <el-steps :active="activeIndex" finish-status="success">
          <el-step title="步骤1"></el-step>
          <el-step title="步骤2"></el-step>
          <el-step title="步骤3"></el-step>
          <el-step title="步骤4"></el-step>
          <el-step title="步骤5"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <!-- tabs栏标签 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
      <el-tab-pane label="基本信息" name="first">
        <el-form :model="addForm" status-icon :rules="rules" ref="addForm"   label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input type="text" v-model="addForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input type="text" v-model="addForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model.number="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input type="text" v-model="addForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              :options="options"
              change-on-select
              :clearable="true"
              v-model="selectedOptions"
              @change="handleChange"
              placeholder="请选择分类"
              expand-trigger="hover"
              :props="props"
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销" prop="is_promote">
            <el-radio v-model="radio" label="1" border>是</el-radio>
            <el-radio v-model="radio" label="2" border>否</el-radio>
          </el-form-item>
          <div class="footer">
            <el-button @click="cancelToEdit">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload/"
          :headers="myheaders"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="UploadSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="fifth">
        <!-- 富文本编辑器 -->
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {getCategories} from '@/api'
export default {
  data () {
    return {
      activeName: 'first',
      activeIndex: 0,
      content: null, // 富文本內容
      editorOption: {}, // 富文本功能模塊
      fileList: [],
      myheaders: {Authorization: localStorage.getItem('adminToken')},
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      addForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: '',
        cat_id: '',
        is_promote: '',
        pics: [],
        attrs: []
      },
      options: [],
      selectedOptions: [],
      radio: '',
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    getCategories({type: 3}).then(res => {
      console.log(res)
      this.options = res.data
    })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      this.activeIndex = parseInt(tab.index)
      if (this.activeIndex !== 0 && this.selectedOptions.length === 0) {
        this.$message({
          type: 'error',
          message: '必须选择商品分类!'
        })
      }
    },
    handleChange (val) {
    },
    cancelToEdit () {
      this.$confirm('此操作将取消已修改内容并返回商品列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({name: 'productlist'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 富文本编辑器
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 文件上传
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    UploadSuccess (res, file) {
      console.log(res, file)
      this.$message.success(res.meta.msg)
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style lang="scss">
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
.el-main .addProduct .el-tabs{
  height: auto;
}
.addProduct {
  .el-tabs {
    height: 400px;
  }
}
.quill-editor {
  height: 400px;
  .ql-container {
    height: 300px;
  }
}
</style>
