import fetch from '../utils/fetch'
// 获取收获地址列表
export function fetchAddressList() {
  return fetch({
    url: '/nodeapi/address/fetchAddressList',
    method: 'get'
  })
}

// 删除某一条收获地址
export function deleteAddress(data) {
  return fetch({
    url: '/nodeapi/address/deleteAddress',
    method: 'get',
    params: data
  })
}

// 添加收获地址
export function createAddress(data) {
  return fetch({
    url: '/nodeapi/address/createAddress',
    method: 'post',
    data
  })
}

// 设为默认地址
export function setDefaultAddress(data) {
  return fetch({
    url: '/nodeapi/address/setDefaultAddress',
    method: 'get',
    params: data
  })
}

// 更新收货地址
export function updateAddress(data) {
  return fetch({
    url: '/nodeapi/address/updateAddress',
    method: 'post',
    data
  })
}

// 根据id获取详细收获地址
export function fetchAddressDetail(data) {
  return fetch({
    url: '/nodeapi/address/fetchAddressDetail',
    method: 'get',
    params: data
  })
}

// 上传用户图片
export function uploadUserImg(data) {
  return fetch({
    url: '/nodeapi/users/uploadUserImg',
    methods: 'post',
    data
  })
}

// 用户获取订单列表
export function fetchOrderList() {
  return fetch({
    url: '/nodeapi/order/fetchOrderList',
    method: 'get'
  })
}

// 创建订单
export function createOrder(data) {
  return fetch({
    url: '/nodeapi/order/createOrder',
    method: 'post',
    data
  })
}

// 获取订单表详情
export function fetchOrderDetail(data) {
  return fetch({
    url: '/nodeapi/order/fetchOrderDetail',
    method: 'get',
    params: data
  })
}

// 获取订单商品表列
export function fetchOrderProducts(data) {
  return fetch({
    url: '/nodeapi/order/fetchOrderProducts',
    method: 'get',
    params: data
  })
}

