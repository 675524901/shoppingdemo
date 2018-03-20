// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

// 路由白名单
const whiteList = ['/home', '/goodsList', '/login', '/goodsDetails']
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token !== '' && token !== null) {
    // 已经登陆
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 全局设定header的token验证，注意Bearer后有个空格
    next()
  } else {
    // 跳转的路径在白名单上的话
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
