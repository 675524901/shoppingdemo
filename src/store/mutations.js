import { setStore, getStore } from '@/utils/storage'

export default {
  // 网页初始化时从本地缓存获取购物车数据
  INIT_BUYCART(state) {
    const initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 给vuex购物车设置新数组
  SET_CART(state, { list }) {
    state.cartList = list
  },
  // 加入购物车
  ADD_CART(state, { productId, productPrice, productName, productImg, productNum = 1 }) {
    const cart = state.cartList // 购物车
    let falg = true
    const goods = {
      productId,
      productPrice,
      productName,
      productImg
    }
    if (cart.length) {
      // 有内容
      cart.forEach(item => {
        if (item.productId === productId) {
          if (item.productNum >= 0) {
            falg = false
            item.productNum += productNum
          }
        }
      })
    }
    if (!cart.length || falg) {
      goods.productNum = productNum
      goods.checked = true
      cart.push(goods)
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  ADD_ANIMATION(state, { moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart }) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  SHOW_CART(state, { showCart }) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  REDUCE_CART(state, { productId }) {
    const cart = state.cartList
    cart.forEach((item, i) => {
      if (item.productId === productId) {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 修改购物车
  EDIT_CART(state, { productId, productNum, checked }) {
    const cart = state.cartList
    if (productNum) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          item.productNum = productNum
          item.checked = checked
        }
      })
    } else if (productId) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          cart.splice(i, 1)
        }
      })
    } else {
      cart.forEach((item) => {
        if (checked) {
          item.checked = true
        } else item.checked = false
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 设置用户信息
  SET_USERINFO(state, info) {
    state.userInfo = { ...info }
  },
  INIT_LOGIN(state) {
    state.login = false
    state.userInfo = []
    state.cartList = []
  }
}
