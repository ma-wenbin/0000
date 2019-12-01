<template>
  <div>
    <el-form ref="loginForm"
             :model="form"
             :rules="rules"
             label-width="80px"
             class="login-box">
      <h2 class="login-title">万达后台管理系统</h2>
      <el-form-item label="账号"
                    prop="username">
        <el-input type="text"
                  placeholder="请输入账号"
                  v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-on:click="onSubmit('loginForm')"
                   style="width:100%">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Http from '@/ajax/http.js'
import Vue from 'vue'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      Http.user_login(this.form)
        .then(rst => {
          let { error_code, result } = rst
          if (error_code == 0 && result.length > 0) {
            // 存储token，用于后面的所有页面请求
            Vue.localStorage.set('token', result[0]._id)
            // 存储username，用于Home页面的右上角显示
            Vue.localStorage.set('username', this.form.username)
            // 跳转到Home页面
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error('用户名或密码错误')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$message.error('请输入正确的用户名和密码')
          return false
        }
      })
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) != '{}') {
      console.log('来自请求拦截')
      let { error_code = 0, reason = '' } = this.$route.params.data

      if (error_code != 0) {
        // 删除当前登录的用户
        Vue.localStorage.remove('username')
        // 删除本地token
        Vue.localStorage.remove('token')
        this.$message.error(reason)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 450px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>