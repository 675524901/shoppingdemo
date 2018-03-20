import fetch from '../utils/fetch'

export function fetchGoodsDetail(data) {
  return fetch({
    url: '/nodeapi/goods/fetchGoodsDetail',
    method: 'get',
    params: data
  })
}
