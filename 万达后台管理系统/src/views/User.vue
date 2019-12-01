<template>
  <div class="user">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'User' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="addBtn">
        <el-button type="primary"
                   style="border-radius: 0px;width:80px"
                   @click="showUserAdd">新增</el-button>
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
          <el-table-column prop="username"
                           label="用户名"
                           width="150">
          </el-table-column>
          <el-table-column prop="role.rolename"
                           label="角色"
                           width="150">
          </el-table-column>
          <el-table-column label="操作"
                           width="300">
            <template slot-scope="scope">
              <el-button @click="updateUser(scope.row)"
                         type="primary"
                         size="small">
                <i class="el-icon-edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button @click="deleteUser(scope.row)"
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
    // 编辑
    updateUser(row) {
      this.$router.push({ name: 'UserAdd', params: row })
    },
    // 删除
    deleteUser(row) {
      Http.user_del(row._id)
        .then(rst => {
          console.log(rst)
          this.getUserCount()

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
    showUserAdd() {
      this.$router.push({ name: 'UserAdd' })
    },
    // 获取用户列表
    getUserList(currpage) {
      Http.user_list(currpage)
        .then(rst => {
          console.log(rst.result)
          this.tableData = rst.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取用户列表
    getUserCount() {
      Http.user_count()
        .then(rst => {
          // 获取了用户列表数据的总数量
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
          // 根据当前页请求用户列表的数据，用于列表渲染
          this.getUserList(this.currpage)
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
      this.getUserList(page)
    }
  },
  created() {
    // 获取用户列表的数量，给分页用
    this.getUserCount()
  },
  data() {
    return {
      tableData: [], //渲染列表的数据源
      currpage: 1, //分页的当前页
      total: 0 //用户列表的总条数（注意不是总页码）
    }
  }
}
</script>
<style lang="less">
.user {
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