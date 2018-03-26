import fetch from '../utils/fetch'

// 登陆时批量同步购物车
export function addSeveralCart(data) {
  return fetch({
    url: '/nodeapi/cart/addSeveralCart',
    method: 'post',
    data
  })
}

// 获取购物车列表
export function fetchCartList() {
  return fetch({
    url: '/nodeapi/cart/fetchCartList',
    method: 'get'
  })
}
