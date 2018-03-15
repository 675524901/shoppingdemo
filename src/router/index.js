import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Index from '@/views/Index'
import Home from '@/views/Home/Home'
import GoodsDetail from '@/views/Goods/GoodsDetail'
import GoodsList from '@/views/Goods/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: '/goodsDetail', name: 'GoodsDetail', component: GoodsDetail },
        { path: 'goodsList', name: 'GoodsList', component: GoodsList }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
