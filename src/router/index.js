import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Index from '@/views/Index'
import Home from '@/views/Home/Home'
import GoodsDetail from '@/views/Goods/GoodsDetail'
import GoodsList from '@/views/Goods/GoodsList'
import Cart from '@/views/Cart/Cart'
import UserIndex from '@/views/User/UserIndex'
import AddressList from '@/views/User/AddressList'
import Information from '@/views/User/Information'
import OrderList from '@/views/User/OrderList'

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
        { path: 'goodsDetail', name: '商品详情', component: GoodsDetail },
        { path: 'goodsList', name: '商品列表', component: GoodsList }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/cart', name: '购物车', component: Cart },
    { path: '/user',
      name: 'UserIndex',
      redirect: '/user/orderList',
      component: UserIndex,
      children: [
        { path: 'addressList', name: '收货地址', component: AddressList },
        { path: 'information', name: '用户信息', component: Information },
        { path: 'orderList', name: '订单管理', component: OrderList }
      ]
    }
  ]
})
