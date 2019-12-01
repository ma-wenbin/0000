import qs from 'qs'

export default {
  install(Vue, router) {
    //  axios的特点：1、基于promise，淘汰callback；2、node和浏览器都可以使用；3、支持拦截器

    // 拦截作用：不管是请求拦截器还是响应拦截器，它们的作用是在请求前或响应后对请求或响应的参数或数据做统一修改处理

    // 添加请求拦截器(请求拦截器可以在数据发送前进行拦截，对axios config的配置做统一修改处理)
    Vue.axios.interceptors.request.use(
      function(config) {
        let token = Vue.localStorage.get('token')
        if (config.url != '/admin/login' && token) {
          config.headers.token = token
        }
        // 把post请求的数据由json转换为 查询字符串 格式
        let { method } = config
        if (method == 'post') {
          // rolename=管理员&limit=5dc1a0a8a2f02a1a84f3662a&limit=5dc1a0a8a2f02a1a84f3662b
          // { arrayFormat: 'repeat' } 用来提交数组数据（角色的新增）
          // 参考：https://blog.csdn.net/sayoko06/article/details/86131498
          config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
        }

        return config
      },
      function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )
    // 添加响应拦截器
    Vue.axios.interceptors.response.use(
      function(response) {
        //  默认返回的似乎response，response是axios的统一格式，我们可以只返回请求服务器的data数据。
        let { error_code = 0 } = response.data

        if (error_code == 401 || error_code == 402 || error_code == 403) {
          router.replace({ name: 'Login', params: response })
        }

        return response.data
      },
      function(error) {
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }
}
