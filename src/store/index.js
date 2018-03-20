import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  // 是否登录
  login: false,
  // 用户信息
  userInfo: null,
  // 加入购物车列表
  cartList: [],
  // 显示飞入图片
  showMoveImg: false,
  elLeft: 0,
  elTop: 0,
  moveImgUrl: null,
  // 购物车位置
  cartPositionT: 0,
  cartPositionL: 0,
  // 是否进入购物车
  receiveInCart: false,
  // 是否显示购物车
  showCart: false
}
const store = new Vuex.Store({
  state,
  mutations
})

export default store
