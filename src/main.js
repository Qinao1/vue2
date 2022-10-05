import Vue from 'vue'
import App from './App.vue'
// 引入mock数据
import './mock/index.js'
// 引入less
import less from 'less'
// 关闭生产提示
Vue.config.productionTip = false
// 初始化样式
import 'normalize.css/normalize.css'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由器
// import router from './router'
// 按需引入element UI
import { Input, Alert,Row,Col,Menu,Submenu,MenuItemGroup,MenuItem} from 'element-ui';
// 引入 store vuex
import store from './store/index'
// 使用less
Vue.use(less)
//使用插件
Vue.use(VueRouter)
// 使用element UI
Vue.use(Input)
Vue.use(Alert)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
new Vue({
  render: h => h(App),
  // router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
  }
}).$mount('#app')
