import fetch from '../utils/fetch'
// 获取收获地址列表
export function fetchAddressList() {
  return fetch({
    url: 'nodeapi/address/fetchAddressList',
    method: 'get'
  })
}

// 删除某一条收获地址
export function deleteAddress(data) {
  return fetch({
    url: 'nodeapi/address/deleteAddress',
    method: 'get',
    params: data
  })
}

// 添加收获地址
export function createAddress(data) {
  return fetch({
    url: 'nodeapi/address/createAddress',
    method: 'post',
    data
  })
}

// 设为默认地址
export function setDefaultAddress(data) {
  return fetch({
    url: 'nodeapi/address/setDefaultAddress',
    method: 'get',
    params: data
  })
}

// 更新收货地址
export function updateAddress(data) {
  return fetch({
    url: 'nodeapi/address/updateAddress',
    method: 'post',
    data
  })
}

// 上传用户图片
export function uploadUserImg(data) {
  return fetch({
    url: 'nodeapi/users/uploadUserImg',
    methods: 'post',
    data
  })
}
