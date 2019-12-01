<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <span>万达电影后台管理系统</span>
        <el-dropdown trigger="click"
                     style="color:white;position:absolute;right:20px;"
                     @command="commond">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="sub-container">
        <el-aside width="300px"
                  class="aside">
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理员</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"
                              @click="showMain('Limit')">
                  <i class="el-icon-user"></i>权限管理
                </el-menu-item>
                <el-menu-item index="1-2"
                              @click="showMain('Role')">
                  <i class="el-icon-user"></i>角色管理</el-menu-item>
                <el-menu-item index="1-3"
                              @click="showMain('User')">
                  <i class="el-icon-user"></i>用户管理</el-menu-item>
                <el-menu-item index="1-4"
                              @click="showMain('Cinema')">
                  <i class="el-icon-user"></i>影院管理</el-menu-item>
                <el-menu-item index="1-5"
                              @click="showMain('Movie')">
                  <i class="el-icon-user"></i>影片管理</el-menu-item>
                <el-menu-item index="1-6"
                              @click="showMain('SalerType')">
                  <i class="el-icon-user"></i>卖品分类</el-menu-item>
                <el-menu-item index="1-6"
                              @click="showMain('User')">
                  <i class="el-icon-user"></i>用户管理</el-menu-item>
                
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

          <!-- <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   :default-openeds="defaultOpeneds">
            <template v-for="limit in limits">
              <el-submenu :index="limit._id"
                          :key="limit._id">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{limit.title}}</span>
                </template>
                <el-menu-item-group>

                  <template v-for="item in limit.children">
                    <el-menu-item :index="item._id"
                                  @click="showMain(item.limitname)"
                                  :key="item._id">
                      <i class="el-icon-user"></i>{{item.title}}
                    </el-menu-item>
                  </template>

                </el-menu-item-group>

              </el-submenu>
            </template>

          </el-menu> -->

        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Http from '@/ajax/http.js'

export default {
  name: 'home',
  methods: {
    // 左侧导航栏点击后要跳转的路由
    showMain(routerName) {
      this.$router.replace({ name: routerName })
    },
    // 登出功能
    commond(type) {
      switch (type) {
        case 'logout':
          // 登出
          this.$router.replace({ name: 'Login' })
          break
        default:
          break
      }
    },
    getData() {
      // 初始化左侧导航列表
      let _id = Vue.localStorage.get('token')
      Http.user_info(_id)
        .then(rst => {
          this.dealTreeData(rst.result[0].role.limit)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 把权限数据处理为导航栏需要的格式
    dealTreeData(limits) {
      let topLev = []
      let secondLev = []
      // 当前循环的作用是把权限列表里面的顶级节点和二级节点分隔开
      limits.forEach(limit => {
        if (limit.pid == '0') {
          limit.children = []
          // 将顶级节点的_id赋值给默认要展开的对象数组
          this.defaultOpeneds.push(limit._id)
          topLev.push(limit)
        } else {
          secondLev.push(limit)
        }
      })
      // 双重循环用来寻找子节点指定的父级节点
      for (let i = 0; i < secondLev.length; i++) {
        var child = secondLev[i]
        for (let j = 0; j < topLev.length; j++) {
          let top = topLev[j]
          // 字节点的pid应该等于父节点的_id
          if (child.pid == top._id) {
            top.children.push(child)
          }
        }
      }
      this.limits = topLev
    }
  },
  data: function() {
    return {
      username: '', //当前登录的用户名
      limits: [], //左侧导航栏的权限列表
      defaultOpeneds: [] //默认展开的导航栏
    }
  },
  created() {
    // 初始化请求导航栏数据
    this.getData()
  },
  mounted() {
    // 登录后的用户名，存在localStorage中，取出来赋值给home页面右上角的显示
    let username = Vue.localStorage.get('username')
    this.username = username
  },
  components: {}
}
</script>
<style lang="less">
.home {
  height: 100%;
  .container {
    height: 100%;
    .header {
      background-color: #545c64;
      color: white;
      font-size: 24px;
      font-weight: bolder;
      text-align: center;
      line-height: 60px;
    }
    .sub-container {
      height: 100%;
      .aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
      }
      .main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
