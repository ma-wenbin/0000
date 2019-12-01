<template>
  <div class="roleadd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Role' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增角色</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="roleaddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:250px;">
          <el-form-item label="
                 权限">
            <div class="roletree">
              <el-tree :data="limits"
                       show-checkbox
                       default-expand-all
                       :default-checked-keys="defaultselectlimits"
                       node-key="_id"
                       :props="defaultProps"
                       @check="checkTree"
                       style="background-color:transparent;width:200px">
              </el-tree>
            </div>
          </el-form-item>
          <el-form-item label="
                 角色"
                        prop="title">
            <el-input v-model="form.title"></el-input>
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
    // tree选中后的回调
    checkTree(data, node) {
      let { checkedKeys, halfCheckedKeys } = node
      let keys = []
      keys = keys.concat(checkedKeys, halfCheckedKeys)

      this.selectlimits = keys
    },
    // 处理请求的数据为tree需要的格式
    dealTreeData(limits) {
      let topLev = []
      let secondLev = []
      // 当前循环的作用是把权限列表里面的顶级节点和二级节点分隔开
      limits.forEach(limit => {
        if (limit.pid == '0') {
          limit.children = []
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
      // console.log(topLev)
    },
    // 处理默认的选中数据
    dealDefaultSelectTree(rst) {
      // 处理默认选中的数据，把顶级节点去掉
      let defSel = this.defaultselectlimits
      let dealDefSel = []
      for (let i = 0; i < defSel.length; i++) {
        var def = defSel[i]
        for (let j = 0; j < rst.length; j++) {
          // 判断当前id不是顶级节点
          if (rst[j].pid != '0' && rst[j]._id == def) {
            dealDefSel.push(def)
          }
        }
      }
      this.defaultselectlimits = dealDefSel
    },
    // 请求权限列表数据
    getRoleList() {
      Http.limit_alllist()
        .then(rst => {
          // 把数据处理为tree组件需要的数据的结构
          this.dealTreeData(rst.result)
          // 处理默认的数据选中（针对更新情况）
          this.dealDefaultSelectTree(rst.result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateRole() {
      if (this.selectlimits.length == 0) {
        this.$message.error('请选择权限')
        return
      }
      // 调用新增角色接口
      Http.role_upd({
        _id: this.id,
        rolename: this.form.title,
        limit: this.selectlimits
      })
        .then(rst => {
          console.log(rst)
          this.$message({
            message: '恭喜你，更新成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('错了哦，这是一条错误消息')
        })
    },
    // 新增角色
    addRole() {
      // 判断用户是否选择了对应的权限
      if (this.selectlimits.length == 0) {
        this.$message.error('请选择权限')
        return
      }
      // 调用新增角色接口
      Http.role_add({ rolename: this.form.title, limit: this.selectlimits })
        .then(rst => {
          console.log(rst)
          this.$message({
            message: '恭喜你，创建成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('错了哦，这是一条错误消息')
        })
    },
    // 验证表单
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          console.log('success')
          if (this.id == '') {
            this.addRole()
          } else {
            this.updateRole()
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
      id: '', //用来接收修改的角色id（mongodb的_id）
      defaultselectlimits: [], //默认选中的权限（用来处理需要修改的权限，新增默认为[]数组）
      selectlimits: [], //选择后的权限列表_id
      form: {
        title: '' //权限标题
      },
      rules: {
        title: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      limits: [], //生成权限树的数组列表
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    // 接收更新传递来的数据
    let { _id = '', limit = [], rolename = '' } = this.$route.params
    this.defaultselectlimits = limit
    this.selectlimits = limit
    this.form.title = rolename
    this.id = _id
    // 请求列表
    this.getRoleList()
  },
  mounted() {}
}
</script>
<style lang="less">
.roleadd {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>