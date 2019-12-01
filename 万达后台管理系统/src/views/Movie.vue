<template>
  <div class="cinema">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Movie' }">影片管理</el-breadcrumb-item>
          <el-breadcrumb-item>影片列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="addBtn">
        <el-button type="primary"
                   style="border-radius: 0px;width:80px"
                   @click="showMovieAdd">新增</el-button>
      </div>
      <div class="
                   tablelist">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column label="序号"
                           width="50"
                           type="index">
          </el-table-column>
          <el-table-column prop="cinema.cinema_name"
                           label="影院名称"
                           width="150">
          </el-table-column>
          <el-table-column prop="moviename"
                           label="影片名称"
                           width="150">
          </el-table-column>

          <el-table-column prop="moviedes"
                           label="影片描述"
                           width="200">
          </el-table-column>
          <el-table-column label="影片封面"
                           width="200">
            <template slot-scope="scope">
              <img :src="dealImgUrl(scope.row.moviecover)"
                   alt="封面"
                   width="30px"
                   height="30px">
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="200">
            <template slot-scope="scope">
              <!-- <el-button @click="updateMovie(scope.row)"
                         type="primary"
                         size="small">
                <i class="el-icon-edit"></i>
                <span>编辑</span>
              </el-button> -->
              <el-button @click="deleteMovie(scope.row)"
                         type="danger"
                         size="small">
                <i class="el-icon-delete"></i>
                <span>删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination"
           v-if="total>0">
        <el-pagination background
                       :page-size="5"
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="currchange">
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  methods: {
    dealImgUrl(url) {
      return 'http://localhost:3000' + url
    },
    // 编辑
    updateMovie(row) {
      this.$router.push({ name: 'MovieAdd', params: row })
    },
    // 删除
    deleteMovie(row) {
      Http.movie_del(row._id)
        .then(rst => {
          console.log(rst)
          this.getMovieCount()

          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 新增路由跳转
    showMovieAdd() {
      this.$router.push({ name: 'MovieAdd' })
    },
    // 获取影院列表
    getMovieList(currpage) {
      Http.movie_list(currpage)
        .then(rst => {
          console.log(rst.result)
          this.tableData = rst.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取影院列表
    getMovieCount() {
      Http.movie_count()
        .then(rst => {
          // 获取了权限列表数据的总数量
          this.total = rst.result
          // 根据总数量计算分页的总页码
          let totol_page = Math.ceil(this.total / 5)
          // 判断如果当前页大于分页的总页码时，把总页码赋值给当前页；否则当前页不变
          this.currpage =
            this.currpage > totol_page ? totol_page : this.currpage
          // 如果数据库没有任何数据，则保持currpage为1，否则(page-1)*limit会报错
          if (this.currpage == 0) {
            this.currpage = 1
          }
          // 根据当前页请求权限列表的数据，用于列表渲染
          this.getMovieList(this.currpage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页页面点击事件
    currchange(page) {
      // 分页器点击后获得page参数，表示当前点击的页码
      // 把页码赋值给当前页
      this.currpage = page
      // 根据当前页请求数据
      this.getMovieList(page)
    }
  },
  created() {
    // 获取权限列表的数量，给分页用
    this.getMovieCount()
  },
  data() {
    return {
      tableData: [], //渲染列表的数据源
      currpage: 1, //分页的当前页
      total: 0 //权限列表的总条数（注意不是总页码）
    }
  }
}
</script>
<style lang="less">
.cinema {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
  .addBtn {
    text-align: left;
  }
}
.tablelist {
  height: 400px;
}
.pagination {
  margin-top: 30px;
}
</style>