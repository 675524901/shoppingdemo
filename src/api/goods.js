import fetch from '../utils/fetch'

export function fetchGoodsDetail(data) {
  return fetch({
    url: '/nodeapi/goods/fetchGoodsDetail',
    method: 'get',
    params: data
  })
}
// 获取商品列表
export function fetchGoodsList(data) {
  return fetch({
    url: '/nodeapi/goods/fetchGoodsList',
    method: 'get',
    params: data
  })
}

