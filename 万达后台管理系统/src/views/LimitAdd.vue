<template>
  <div class="limitadd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Limit' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增权限</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="limitaddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="上级权限">

            <el-select v-model="form.pid"
                       placeholder="无"
                       style="
                       width:100%">
              <el-option label="无"
                         value="0"></el-option>
              <!-- 循环渲染权限列表 -->
              <template v-for="item in selectData">
                <!-- 如果是顶级节点则禁用 -->
                <el-option :label="item.title"
                           :value="item._id"
                           :key="item._id"
                           :disabled="form.pid=='0' && id!=''"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="路由">
            <el-input v-model="form.limitname"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary"
                       @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  methods: {
    getLimitList() {
      Http.limit_alllist()
        .then(rst => {
          // this.selectData用于显示上级权限，这里只列出顶级节点
          rst.result.forEach(val => {
            // 过滤出顶级节点
            if (val.pid == '0') {
              this.selectData.push(val)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatelimit() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.limit_upd(param)
        .then(rst => {
          console.log(rst)
          this.$message({
            message: '恭喜你，更新成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 提交表单
    addlimit() {
      Http.limit_add(this.form)
        .then(rst => {
          // element-ui 的Message消息提示
          this.$message({
            message: '恭喜你，创建成功',
            type: 'success'
          })
          this.$router.go(-1)
          console.log(rst)
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 验证表单
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.addlimit()
          } else {
            //   如果id不为空，则当前提交为修改
            this.updatelimit()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  data() {
    return {
      selectData: [],
      form: {
        pid: '0', //父级节点的id
        title: '', //权限标题
        limitname: '' //权限路由
      },
      rules: {
        title: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
      },
      pid: 0,
      id: ''
    }
  },
  created() {
    //   初始化上级权限下拉框
    this.getLimitList()
  },
  mounted() {
    //   this.$route.params传递的是update更新的数据
    let { _id = '', pid = '0', title = '', limitname = '' } = this.$route.params
    this.form.title = title
    this.form.limitname = limitname
    // pid表示当前节点的父节点_id
    this.form.pid = pid
    this.id = _id
    console.log(this.id)
  }
}
</script>
<style lang="less">
.limitadd {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>