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

// 添加单一商品进购物车
export function addCart(data) {
  return fetch({
    url: '/nodeapi/cart/addCart',
    method: 'post',
    data
  })
}

// 删除购物车中商品
export function deleteCart(data) {
  return fetch({
    url: '/nodeapi/cart/deleteCart',
    method: 'get',
    params: data
  })
}

// 编辑购物车
export function editCart(data) {
  return fetch({
    url: '/nodeapi/cart/editCart',
    method: 'post',
    data
  })
}

// 处理全部勾选
export function editSelectAll(data) {
  return fetch({
    url: '/nodeapi/cart/editSelectAll',
    method: 'get',
    params: data
  })
}
