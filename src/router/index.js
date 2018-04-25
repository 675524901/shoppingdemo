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
import PurchaseIndex from '@/views/Purchase/Index'
import Checkout from '@/views/Purchase/Checkout'
import Payment from '@/views/Purchase/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      redirect: '/home',
      children: [
        { path: 'home', meta: { requireAuth: false }, component: Home },
        { path: 'goodsDetail', name: '商品详情', meta: { requireAuth: false }, component: GoodsDetail },
        { path: 'goodsList', name: '商品列表', meta: { requireAuth: false }, component: GoodsList }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { requireAuth: false },
      component: Login
    },
    { path: '/cart', name: '购物车', meta: { requireAuth: true }, component: Cart },
    {
      path: '/user',
      name: 'UserIndex',
      redirect: '/user/orderList',
      component: UserIndex,
      children: [
        { path: 'addressList', name: '收货地址', meta: { requireAuth: true }, component: AddressList },
        { path: 'information', name: '用户信息', meta: { requireAuth: true }, component: Information },
        { path: 'orderList', name: '订单管理', meta: { requireAuth: true }, component: OrderList }
      ]
    },
    {
      path: '/purchase',
      name: 'Purchase',
      component: PurchaseIndex,
      children: [
        { path: 'checkout', name: '确认订单', meta: { requireAuth: true }, component: Checkout },
        { path: 'payment', name: '支付订单', meta: { requireAuth: true }, component: Payment }
      ]
    }
  ]
})
