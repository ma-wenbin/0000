<template>
  <div class="Useradd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'User' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="Useraddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="角色">
            <el-select v-model="form.role"
                       placeholder="无"
                       style="
                       width:100%">
              <!-- 循环渲染用户列表 -->
              <template v-for="item in roles">
                <el-option :label="item.rolename"
                           :value="item._id"
                           :key="item._id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码"
                        prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item> -->
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
    getRoleList() {
      Http.role_alllist()
        .then(rst => {
          this.roles = rst.result
          // 新增的时候初始化下拉列表的默认选中项目，默认为角色列表的第一个数据
          if (this.form.role == '0') {
            this.form.role = rst.result[0]._id
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateUser() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.user_upd(param)
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
    addUser() {
      Http.user_add(this.form)
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
            this.addUser()
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateUser()
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
      roles: [],
      form: {
        role: '0', //角色id
        username: '' //用户名
        // password: '' //密码
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      id: ''
    }
  },
  created() {
    //   this.$route.params传递的是update更新的数据
    let {
      _id = '',
      role = '0',
      username = ''
      // password = ''
    } = this.$route.params
    // 如果是修改，则role不等于0
    if (role != 0) {
      this.form.role = role._id
    }

    this.form.username = username
    // this.form.password = password
    this.id = _id
    //   初始化角色下拉框
    this.getRoleList()
  },
  mounted() {}
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