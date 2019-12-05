万达后台管理系统
1、启动mongodb数据库(mongod --dbpath 路径)

2、启动node后台服务器

3、在前台wanda_pc根目录下新增vue.config.js（配置跨域）
module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://localhost:3000/',
        ws: true,
        changOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}

4、安装vue-axios和axios；并通过插件的形式引入axios

import vueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(vueAxios, axios)

5、编写拦截器插件（interceptors.js）,并在main.js中引入插件

import interceptor from '@/plugins/interceptors.js'
Vue.use(interceptor)

注意：interceptor插件的引入要晚于vueAxios，否则报错

6、编写http.js完成权限管理接口：

import Vue from 'vue'
二 主要的
后台管理系统：

1、权限管理：为什么要进行权限管理，之所有使用权限管理是因为我们需要给不同的用户显示不同的页面；后台程序的功能可能有100个，超级用户（root）可以全部访问，部门管理者用户可以访问一部分，普通人员可以访问一部分

权限管理分三个模块：权限，角色，用户

权限的作用：配置路由,用于用户访问不同的路由页面，实际来说，权限模块中应该把所有的功能路由都配置出来

角色的作用：可以根据角色来划分不同的权限，比如建立一个超级管理员角色，它应该具备所有的权限功能，建立一个科目负责人角色，他应该具备当前科目下的所有功能，建立一个阶段负责人角色， 他应该具备当前阶段的功能。

用户的作用：我们的系统可以新建不同的用户，比如，张三，李四，王五；给张三分配超级管理员角色，张三就可以访问所有的路由页面功能，给李四分配部门管理角色，李四就具备部分他所在部门的路由功能...


2、登录拦截（全局前置守卫beforeEach和Axios拦截器）

为什么要登录拦截？比如用户操作一个商城系统要下订单，如果用户没有登录，则无法下单；那么就意味着需要用户登陆后才能访问的页面可能不止一个；在vue中实现多个页面的访问需要用到vue-router路由；我们可以使用它的导航守卫对需要登录后才能访问的页面这种情况进行判断；做法是使用全局前置守卫beforeEach判断，在里面判断用户是否登录过，如果登录过则next()，如果没有登录则next({name:'login'})跳转到登录页面；核心是判断用户是否登陆过；我们在localStorage中存储了一个token，用它来判断用户是否登录，该token的获取是在用户登录成功后接口返回的，需要把token存储到localStorage中，用于后续的判断。登录拦截的实现环节中，除了登录页面，其他的页面请求访问都需要在请求的header中携带token信息；所以可以在axios的请求拦截器里面设置header信息；如果token过期或token无效则返回的结果在axios的响应拦截器中获取，并跳转到登录页。



// 权限接口
const LIMIT_ADD = '/admin/addlimit' //新增权限
const LIMIT_LIST = '/admin/getlimit' //查询权限
const LIMIT_DEL = '/admin/deletelimit' //删除权限
const LIMIT_UPD = '/admin/updatelimit' //修改权限

class Http {
  static common({
    url = '',
    method = 'GET',
    params = {},
    data = {},
    baseURL = '/api'
  } = {}) {
    return Vue.axios({
      url,
      //   method是请求方法
      method,
      //   baseURL将于url做字符串拼接合并
      baseURL,
      //   params是get携带的参数
      params,
      //   data是post携带的参数
      data
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
    })
  }
  // 新增权限
  static limit_add({ pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_ADD,
      method: 'POST',
      data: { pid, limitname, title }
    })
  }
  // 查询权限列表
  static limit_list() {
    return this.common({
      url: LIMIT_LIST
    })
  }
  // 删除权限
  static limit_del(_id) {
    return this.common({
      url: LIMIT_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改权限
  static limit_upd({ _id, pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_UPD,
      method: 'POST',
      data: { _id, pid, limitname, title }
    })
  }
}

export default Http


7、修改左侧导航栏标题为:权限管理，角色管理和用户管理

8、配置路由：
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Limit from '../views/Limit.vue'
import LimitAdd from '../views/LimitAdd.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // 权限管理
      // 权限列表
      {
        path: '/limit',
        name: 'Limit',
        component: Limit
      },
      // 新增权限
      {
        path: '/limitadd',
        name: 'LimitAdd',
        component: LimitAdd
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router


9、编写权限新增页面（新增接口）

10、编写权限列表页面（查询接口）

11、编写删除功能

12、编写修改功能




一、
1、替换接口文件

2、删除数据库中的adminusers集合

3、执行db.adminusers.insert({username:"root",password:"9e9b673b7a75b6b1142b2a0b1525f660"});新增一个root超级管理员用户

4、在Home.vue文件中解锁导航栏注释代码

5、在前台使用(username)root:(password)root登录系统，然后在用户管理里面，给root “超级管理员角色”

二、通过 mongoimport -d wanda -c cities --jsonArray 导入路径   导入cities.json数据文件；在浏览器中输入 http://localhost:3000/api/citys 访问数据，如果可行，则证明数据导入成功
