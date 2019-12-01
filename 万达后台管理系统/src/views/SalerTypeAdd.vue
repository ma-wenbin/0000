<template>
  <div class="SalerTypeAdd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'SalerType' }">卖品分类管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增卖品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="salertypeaddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="影院名称">

            <el-cascader :options="citys"
                         @active-item-change="selectCity"
                         v-model="form.cinema"
                         :props="props"
                         style="width:100%;"></el-cascader>
          </el-form-item>
          <el-form-item label="分类"
                        prop="salertype">
            <el-input v-model="form.salertype"></el-input>
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
          // 把获取到的城市列表按照级联选择的方式组织数据
          let citys = rst.result
          this.citys = citys.map(city => {
            let { city_name: label, _id: id } = city
            return { label, id, cinemas: [] }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 选择城市后加载当前城市对应的电影院
    selectCity(val) {
      // 判断次级数据是否已经加载过，如果已经加载过则return返回
      let cinemaData = []
      this.citys.forEach(city => {
        if (city.id == val[0]) {
          cinemaData = city.cinemas
        }
      })
      if (cinemaData.length > 0) return
      // 根据当前城市id请求城市对应的电影院，并把电影院信息加入到级联选择器的cinemas数组中
      Http.cinema_byid(val)
        .then(rst => {
          //   let { _id, cinema_name } = rst.result
          let currCity = this.citys.filter(city => {
            return city.id == val[0]
          })
          rst.result.forEach(cinema => {
            let { cinema_name: label, _id: id } = cinema
            currCity[0]['cinemas'].push({ label, id })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateSalerType() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.salerType_add_upd(param)
        .then(rst => {
          let { error_code } = rst
          if (error_code == 0) {
            this.$message({
              message: '恭喜你，更新成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else if (error_code == 11000) {
            this.$message.error('类别重复，新增失败')
          }
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 提交表单
    addSalerType() {
      if (this.form.cinema == '') {
        this.$message.error('请选择影院')
        return
      }
      this.form.cinema = this.form.cinema[1]
      Http.salerType_add(this.form)
        .then(rst => {
          console.log(rst)
          // element-ui 的Message消息提示
          let {
            error_code,
            result: { code }
          } = rst

          if (error_code == 0) {
            this.$message({
              message: '恭喜你，更新成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else if (code == 11000) {
            this.$message.error('类别重复，新增失败')
          } else {
            this.$message.error('新增失败')
          }
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
            this.addSalerType()
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateSalerType()
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
      citys: [],
      props: {
        value: 'id',
        children: 'cinemas'
      },
      form: {
        cinema: '',
        salertype: '' //用户名
      },
      rules: {
        salertype: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      id: ''
    }
  },
  created() {
    //   this.$route.params传递的是update更新的数据
    let { _id = '', salertype = '' } = this.$route.params

    this.form.salertype = salertype
    this.id = _id

    this.getCityList()
  },
  mounted() {}
}
</script>
<style lang="less">
.SalerTypeAdd {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>