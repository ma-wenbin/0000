##### 一、Vue中的is使用场景：

1、动态组件component切换组件
2、dom内模板限制情况下使用，比如table，ol,ul,select中使用组件

##### 二、组件中的data为什么是一个函数而不是对象

组件的定义是一个可复用的vue实例，如果data是一个对象的话，由于对象拷贝的特性是浅拷贝，反复使用组件的时候data对象的指向是同一份数据，无法完成各个组件的内容独立拷贝，所以使用一个工厂函数来产生对象，每次使用组件都会针对当前组件产生一份独立的data数据拷贝，这符合组件的可复用性。

##### 三、vue深度监听的使用方法(deep)

```
new Vue（{

​	el:"#app",

​```
data:{
			info = {
name :'zhangsan',
age : 20
​```

},

mouted(){

​	this.$watch('info.age',function(newVal,oldVal){},{deep:true})

​      this.info.age = 22;

}
}

}）


```




##### 四、vue的优点


vue的优势：轻量级框架、简单易学、双向数据绑定、组件化、视图、数据和结构的分离、虚拟DOM、运行速度快

vue是单页面应用，使页面局部刷新，不用每次跳转页面都要请求所有数据和dom，这样大大加快了访问速度和提升用户体验。而且他的第三方ui库很多节省开发时间。

##### 五、动态绑定class的方法

对象方法：

```
	:class="{ 'active': isActive }"

​	:class="{'active':isActive==-1}"

或者

​	:class="{'active':isActive==index}"

绑定并判断多个

​	:class="{ 'active': isActive, 'sort': isSort }"

第二种（放在data里面）

​	:class="classObject"

​	data() {

​		return {

​	 		classObject:{ active: true, sort:false }

​		}

​	}

数组方法

​	:class="[isActive,isSort]"

​	data() {

​		return{

​			isActive:'active',

​			isSort:'sort'

​		}

​	}

​	:class="[isActive?'active':'']"

​	:class="[isActive==1?'active':'']"
```



##### 六、vue.js的两个核心是什么？

1、vm数据驱动：
在vue中，数据的改变会驱动视图的自动更新。传统的做法是需要手动改变DOM来使得视图更新，而vue只需要改变数据。

2、组件
组件化开发，优点很多，可以很好的降低数据之间的耦合度。将常用的代码封装成组件之后（vue组件封装方法），就能高度的复用，提高代码的可重用性。一个页面/模块可以由多个组件所组成。

##### 七、vue中的组件作用是什么，如何定义使用组件？（局部和全局注册组件的方式）

组件的作用是用来完成vue实例的可复用，以很好的降低数据之间的耦合度。将常用的代码封装成组件之后（vue组件封装方法），就能高度的复用，提高代码的可重用性。一个页面/模块可以由多个组件所组成。
Vue.component('navbar',{
	template : ``,
	...
})
new Vue({
	components : {
		navbar : {
			template : ``,
			...
		}
	}
})

##### 八、spa单页面应用的优缺点

优点： 
1.分离前后端关注点，前端负责view，后端负责model，各司其职； 
2.服务器只接口提供数据，不用展示逻辑和页面合成，提高性能； 
3.同一套后端程序代码，不用修改兼容Web界面、手机； 
4.用户体验好、快，内容的改变不需要重新加载整个页面 
5.可以缓存较多数据，减少服务器压力 
6.单页应用像网络一样，几乎随处可以访问—不像大多数的桌面应用，用户可以通过任务网络连接和适当的浏览器访问单页应用。如今，这一名单包括智能手机、平板电脑、电视、笔记本电脑和台式计算机。 
缺点： 
1.SEO问题没有html抓不到什么。。。 
2.刚开始的时候加载可能慢很多 
3.用户操作需要写逻辑，前进、后退等； 
4.页面复杂度提高很多，复杂逻辑难度成倍

##### 九、什么是vue的计算属性

在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。

好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

##### 十、MVVM的理解

MVVM分为三个部分：分别是M（Model，模型层 ），V（View，视图层），VM（ViewModel，V与M连接的桥梁，也可以看作为控制器）
 1、 M：模型层，主要负责业务数据相关；
 2、 V：视图层，顾名思义，负责视图相关，细分下来就是html+css层；
 3、 VM：V与M沟通的桥梁，负责监听M或者V的修改，是实现MVVM双向绑定的要点；

MVVM支持双向绑定，意思就是当M层数据进行修改时，VM层会监测到变化，并且通知V层进行相应的修改，反之修改V层则会通知M层数据进行修改，以此也实现了视图与模型层的相互解耦；



##### 十一、列举4个vue的指令，并说明用意（v-if,v-for,v-show,v-once）

v-if：判断是否隐藏；v-for：数据循环出来；v-bind:class：绑定一个属性；v-model：实现双向绑定，

v-show 和v-if都是true的时候显示，false的时候隐藏

但是：false的情况下，v-show是采用的display:none;,v-if采用惰性加载。

如果需要频繁切换显示隐藏需要使用v-show

`v-show` 简单得多——元素始终被编译并保留，只是简单地基于 CSS 切换。

##### 十二、vue中的key值作用（参看api教程）

所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

**更准确**：因为带 key 就不是就地复用了，在 sameNode 函数 `a.key === b.key` 对比中可以避免就地复用的情况。所以会更加准确。

**更快速**：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快

key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes（dom节点） 对比时辨识 VNodes（虚拟dom节点）。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

##### 十三、常见的修饰符有哪些

prevent，stop，capture，self。lazy，trim

##### 十四、对vue渐进式框架的理解

Vue与React、Angular的不同是，但它是渐进的：
1、可以在原有的大系统的上面，把一两个组件改用它实现，就是当成jQuery来使用。
2、可以整个用它全家桶开发，当Angular来使用。
3、可以用它的视图，搭配你自己设计的整个下层使用。
4、可以在底层数据逻辑的地方用OO和设计模式的那套理念。
5、可以函数式，它只是个轻量视图而已，只做了最核心的东西。

##### 十五、watch和computed的区别

1. computed是计算属性，用法与data一致
2. watch像事件监听，对象发生变化时，执行相关操作
3. computed不修改原始数据，通过return返回处理的数据，可以包含大量的逻辑运算
4. computed通常只有get属性
5. 数据变化的同时进行异步操作或者是比较大的开销，那么watch为最佳选择
6. watch的对象必须事先声明

##### 十六、父传子、子传父、兄弟传

1，在子组件的标签上定义一个变量，：变量=‘传的值’，在子级中使用props接收变量

2.在子组件中写一个事件，事件中使用this.$emit(‘自定义事件名’，’数据’)；在父级中的子标签上使用@自定义事件 = ‘父级事件’来接收

3.创建一个新的vue实例 var trans = new Vue()

在组件一中：trans.$on(‘事件’，（n）=>{console.log(n) })

在组件二中：trans.$emit(‘事件’，’发送的数据’)（写在2的事件中）

##### 十七 axios是什么？怎么使用？

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：

从浏览器中创建 XMLHttpRequest

从 node.js 发出 http 请求

支持 Promise API

拦截请求和响应

转换请求和响应数据

取消请求自动转换JSON数据

请求后台资源模块，使用npm install axios来安装

在main.js入口文件中应用，import axios from ‘axios’

将axios挂载到Vue实例上Vue.prototype.$axios=axios

在需要调用后台资源组件中使用this.$axios({url:'/api/dizhi',method:'post'}).then(res=>{}).catch(err=>{})





##### 十八  导航守卫:

全局前置守卫:beforeEach,进行全局拦截,所有页面均不能查看

全局后置钩子:afterEach

路由独享的守卫:beforeEnter,进行某一个页面的拦截

组件内前置守卫:beforeRouteEnter 

组件内变更守卫 :beforeRouteUpdate 

组件内后置守卫:beforeRouteLeave 

beforeRouteEnter (to, from, next) {

  next(vm => {

​    // 通过 `vm` 访问组件实例

  })

}

to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

Next:通行证,可传入路径,布尔值

##### 十九， 怎么解决vue的跨域问题?

在config文件夹下的index.js中去配置代理

proxyTable: {

​      '/api': {

​        target: 'http://localhost:3000',  //目标接口域名

​        changeOrigin: true,  //是否跨域

​        pathRewrite: {

​          '^/api': ''   //重写接口

​        }

​      }

##### 二十，$route和$router的使用

$route为当前router跳转对象里面可以获取name、path、query、params等

$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法

##### 二十，vuex是什么，

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

###### state， mutation ,getters,actions,modules

state里面就是存放的我们上面所提到的状态
mutations就是存放如何更改状态
getters就是从state中派生出状态，比如将state中的某个状态进行过滤然后获取新的状态。
actions就是mutation的加强版，它可以通过commit mutations中的方法来改变状态，最重要的是它可以进行异步操作。
modules顾名思义，就是当用这个容器来装这些状态还是显得混乱的时候，我们就可以把容器分成几块，把状态和管理规则分类来装。这和我们创建js模块是一个目的，让代码结构更清晰。

二十一， Vue等单页面的应用及其优缺点？

优点：分离前后端关注点；前端负责界面显示，后端负责数据存储和计算

通过竟可能简单的API实现向相应的数据绑定和组合的视图组价

同一套后端程序代码，不用修改就可以用于多种设备客户端

用户体验号，快，内容的改变不需要重新加载整个页面