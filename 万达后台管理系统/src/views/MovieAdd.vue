<template>
  <div class="movieadd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Movie' }">影片管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增影片</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="movieaddform">
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 :rules="rules"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="影院名称">

            <el-cascader :options="citys"
                         @active-item-change="selectCity"
                         v-model="form.cinema"
                         @change="cascaderChange"
                         :props="props"
                         style="width:100%;"></el-cascader>
          </el-form-item>
          <el-form-item label="片名"
                        prop="movie_name">
            <el-input v-model="form.movie_name"></el-input>
          </el-form-item>
          <el-form-item label="影片描述">
            <el-input v-model="form.movie_detail"></el-input>
          </el-form-item>
          <!-- 文件上传 -->
          <el-form-item style="text-align:left;">
            <el-upload action="/api/admin/movie/fileupload"
                       list-type="picture-card"
                       accept=".jpg,.png,.gif"
                       :limit="1"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :on-success="handleSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible"
                       size="tiny">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item style="text-align:left;">
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
  data() {
    return {
      id: '',
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        movie_name: '',
        movie_detail: '',
        movie_cover: '',
        cinema: ''
      },
      //   列出所有的城市
      citys: [],
      //   用户通过级联选择器，选择的影院
      props: {
        value: 'id',
        children: 'cinemas'
      },
      rules: {
        movie_name: [
          { required: true, message: '请输入影片名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let {
      _id = '',
      moviedes,
      moviename = '',
      moviecover = '',
      cinema = ''
    } = this.$route.params
    this.form.movie_name = moviename
    this.form.movie_detail = moviedes
    this.form.movie_cover = moviecover

    this.form.cinema = cinema._id

    this.id = _id
    //   初始化城市列表下拉框
    this.getCityList()
  },
  mounted() {},
  methods: {
    handleSuccess(response) {
      this.form.movie_cover = response.data.url
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //   获取城市列表
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
    getCinemaList() {},
    updateMovie() {
      let param = {
        _id: this.id,
        ...this.form
      }
      Http.movie_upd(param)
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
    addMovie() {
      if (this.form.cinema == '') {
        this.$message.error('请选择影院')
        return
      }
      let obj = {
        cinema: this.form.cinema[1],
        moviename: this.form.movie_name,
        moviedes: this.form.movie_detail,
        moviecover: this.form.movie_cover
      }
      Http.movie_add(obj)
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
          this.addMovie()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cascaderChange() {},
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
    }
  }
}
</script>
<style lang="less">
.movieadd {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>