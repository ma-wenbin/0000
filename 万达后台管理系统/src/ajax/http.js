import Vue from 'vue'

// 权限接口
const LIMIT_ADD = '/admin/addlimit' //新增权限
const LIMIT_LIST = '/admin/getlimit' //查询权限
const LIMIT_ALLLIST = '/admin/getlimitall' //查询权限
const LIMIT_DEL = '/admin/deletelimit' //删除权限
const LIMIT_UPD = '/admin/updatelimit' //修改权限
const LIMIT_COUNT = '/admin/getlimitcount' //获取权限列表的数量

// 角色接口
const ROLE_ADD = '/admin/addrole' //新增角色
const ROLE_LIST = '/admin/getrole' //分页查询角色列表
const ROLE_ALLLIST = '/admin/getallrole' //查询所有角色
const ROLE_DEL = '/admin/deleterole' //删除角色
const ROLE_COUNT = '/admin/getrolecount' //查询所有角色的条数
const ROLE_UPD = '/admin/updaterole' //更新角色

// 用户接口
const USER_ADD = '/admin/adduser' //新增用户
const USER_LIST = '/admin/getadminuser' //用户列表分页查询
const USER_ALLLIST = '/admin/getalladminuser' //查询所有用户
const USER_DEL = '/admin/deleteuser' //删除用户
const USER_COUNT = '/admin/getadminusercount' //查询用户列表的条数
const USER_UPD = '/admin/updateuser' //更新用户
const USER_LOGIN = '/admin/login' //用户登录
const USER_INFO = '/admin/getadminuserbyid' //获取指定_id用户的信息

// 城市列表
const CITY = '/citys' //城市列表
// 影院管理
const CINEMA_ADD = '/addcinemas'
const CINEMA_UPD = '/updcinemas'
const CINEMA_DEL = '/delcinemas'
const CINEMA_LIST = '/cinemas'
const CINEMA_COUNT = '/cinemacount'
const CINEMA_BYID = '/cinemasbycityid'

// 添加影片
const MOVIE_ADD = '/admin/addmovie'
const MOVIE_UPD = '/admin/updmovie'
const MOVIE_DEL = '/admin/delmovie'
const MOVIE_LIST = '/movie'
const MOVIE_COUNT = '/moviecount'

// 卖品分类
const SALERTYPE_ADD = '/addsalertype'
const SALERTYPE_UPD = '/updsalertype'
const SALERTYPE_DEL = '/delsalertype'
const SALERTYPE_LIST = '/salertype'
const SALERTYPE_COUNT = '/salertypecount'

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

  /*******************************权限接口********************************** */
  // 新增权限
  static limit_add({ pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_ADD,
      method: 'POST',
      data: { pid, limitname, title }
    })
  }
  // 查询权限列表(分页查询)
  static limit_list(currpage) {
    return this.common({
      url: LIMIT_LIST,
      params: { currpage }
    })
  }
  // 查询权限列表（查询所有）
  static limit_alllist() {
    return this.common({
      url: LIMIT_ALLLIST
    })
  }
  // 查询权限列表数量
  static limit_count() {
    return this.common({
      url: LIMIT_COUNT
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
  /*******************************角色接口********************************** */
  // 新增角色
  static role_add({ rolename, limit } = {}) {
    return this.common({
      url: ROLE_ADD,
      method: 'POST',
      data: { rolename, limit }
    })
  }
  // 分页查询角色
  static role_list(currpage) {
    return this.common({
      url: ROLE_LIST,
      params: { currpage }
    })
  }
  // 查询角色列表（查询所有）
  static role_alllist() {
    return this.common({
      url: ROLE_ALLLIST
    })
  }
  // 查询角色列表数量
  static role_count() {
    return this.common({
      url: ROLE_COUNT
    })
  }
  // 删除角色
  static role_del(_id) {
    return this.common({
      url: ROLE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改角色
  static role_upd({ _id, rolename, limit } = {}) {
    return this.common({
      url: ROLE_UPD,
      method: 'POST',
      data: { _id, rolename, limit }
    })
  }
  /*******************************用户接口********************************** */
  // 新增用户
  static user_add({ username, password, role } = {}) {
    return this.common({
      url: USER_ADD,
      method: 'POST',
      data: { username, password, role }
    })
  }
  // 分页查询用户
  static user_list(currpage) {
    return this.common({
      url: USER_LIST,
      params: { currpage }
    })
  }
  // 查询用户列表（查询所有）
  static user_alllist() {
    return this.common({
      url: USER_ALLLIST
    })
  }
  // 查询用户列表数量
  static user_count() {
    return this.common({
      url: USER_COUNT
    })
  }
  // 删除用户
  static user_del(_id) {
    return this.common({
      url: USER_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 修改用户
  static user_upd({ _id, username, password, role } = {}) {
    return this.common({
      url: USER_UPD,
      method: 'POST',
      data: { _id, username, password, role }
    })
  }
  // 用户登录
  static user_login({ username, password } = {}) {
    return this.common({
      url: USER_LOGIN,
      method: 'POST',
      data: { username, password }
    })
  }
  // 获取用户信息
  static user_info(_id = '') {
    return this.common({
      url: USER_INFO,
      params: { _id }
    })
  }
  /*******************************城市列表接口********************************** */
  // 城市列表
  static city_info() {
    return this.common({
      url: CITY
    })
  }
  /*******************************影院管理********************************** */
  // 添加影院
  static cinema_add({ cinema_name, cinema_address, cityid } = {}) {
    return this.common({
      url: CINEMA_ADD,
      method: 'POST',
      data: { cinema_name, cinema_address, cityid }
    })
  }
  // 分页查询影院列表
  static cinema_list(currpage) {
    return this.common({
      url: CINEMA_LIST,
      params: { currpage }
    })
  }
  // 更新影院
  static cinema_upd({ _id, cinema_name, cinema_address, cityid } = {}) {
    return this.common({
      url: CINEMA_UPD,
      method: 'POST',
      data: { _id, cinema_name, cinema_address, cityid }
    })
  }
  // 删除影院
  static cinema_del(_id) {
    return this.common({
      url: CINEMA_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 查询影院数量
  static cinema_count() {
    return this.common({
      url: CINEMA_COUNT
    })
  }
  // 根据城市id查询当前城市下的影院
  static cinema_byid(cityid) {
    return this.common({
      url: CINEMA_BYID,
      params: { cityid }
    })
  }
  /*******************************影片管理********************************** */

  // 新增影片
  static movie_add({ moviename, moviedes, moviecover, cinema } = {}) {
    return this.common({
      url: MOVIE_ADD,
      method: 'POST',
      data: { moviename, moviedes, moviecover, cinema }
    })
  }
  static movie_upd({ _id, moviename, moviedes, moviecover, cinema } = {}) {
    return this.common({
      url: MOVIE_UPD,
      method: 'POST',
      data: { _id, moviename, moviedes, moviecover, cinema }
    })
  }
  // 删除影院
  static movie_del(_id) {
    return this.common({
      url: MOVIE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 查询影片
  static movie_list(currpage) {
    return this.common({
      url: MOVIE_LIST,
      params: { currpage }
    })
  }
  // 查询影片数量
  static movie_count() {
    return this.common({
      url: MOVIE_COUNT
    })
  }
  /*******************************卖品类别管理********************************** */

  // 新增影片
  static salerType_add({ salertype, cinema } = {}) {
    return this.common({
      url: SALERTYPE_ADD,
      method: 'POST',
      data: { salertype, cinema }
    })
  }
  static salerType_add_upd({ _id, salertype, cinema } = {}) {
    return this.common({
      url: SALERTYPE_UPD,
      method: 'POST',
      data: { _id, salertype, cinema }
    })
  }
  // 删除影院
  static salerType_add_del(_id) {
    return this.common({
      url: SALERTYPE_DEL,
      method: 'POST',
      data: { _id }
    })
  }
  // 查询影片
  static salerType_add_list(currpage) {
    return this.common({
      url: SALERTYPE_LIST,
      params: { currpage }
    })
  }
  // 查询影片数量
  static salerType_add_count() {
    return this.common({
      url: SALERTYPE_COUNT
    })
  }
}

export default Http
