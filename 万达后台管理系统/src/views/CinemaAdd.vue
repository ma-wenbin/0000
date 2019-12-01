<template>
  <div class="cinemaadd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Cinema' }">影院管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增影院</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="cinemaaddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="所属城市">

            <el-select v-model="
                        form.cityid"
                       filterable
                       placeholder="请选择"
                       style="
                       width:100%">
              <!-- 循环渲染权限列表 -->
              <template v-for="item in selectData">
                <!-- 如果是顶级节点则禁用 -->
                <el-option :label="item.city_name"
                           :value="item._id"
                           :key="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="名称"
                        prop="cinema_name">
            <el-input v-model="form.cinema_name"></el-input>
          </el-form-item>
          <el-form-item label="地址"
                        prop="cinema_address">
            <el-input v-model="form.cinema_address"></el-input>
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
    getCityList() {
      Http.city_info()
        .then(rst => {
          console.log(rst)
          this.selectData = rst.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCinema() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.cinema_upd(param)
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
    addCinema() {
      Http.cinema_add(this.form)
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
            this.addCinema()
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateCinema()
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
        // 北京的id
        cityid: '5dc8fe2a21ac78675a1e5c6c',
        cinema_name: '', //影院名称
        cinema_address: '' //影院地址
      },
      rules: {
        cinema_name: [
          { required: true, message: '请输入影院名称', trigger: 'blur' }
        ],
        cinema_address: [
          { required: true, message: '请输入影院地址', trigger: 'blur' }
        ]
      },
      id: ''
    }
  },
  created() {
    // 接收更新传递来的数据
    let {
      _id = '',
      cityid = '5dc8fe2a21ac78675a1e5c6c',
      cinema_name = '',
      cinema_address = ''
    } = this.$route.params
    this.form.cityid = cityid
    this.form.cinema_name = cinema_name
    this.form.cinema_address = cinema_address
    this.id = _id
    //   初始化城市列表下拉框
    this.getCityList()
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