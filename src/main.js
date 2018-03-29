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
import { getUserInfo } from '@/api/login'

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
const whiteList = ['/home', '/goodsList', '/login', '/goodsDetail']
router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('token')
  // 已经登陆
  if (token !== '' && token !== null) {
    const res = await getUserInfo()
    if (res.data.status === '0') {
      store.state.userInfo = res.data.userInfo
    }
    store.state.login = true
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
