import fetch from '../utils/fetch'

export function fetchSettings(data) {
  return fetch({
    url: '/nodeapi/setting/fetchSettings',
    method: 'get',
    params: data
  })
}

export function fetchNewUpGoods() {
  return fetch({
    url: '/nodeapi/setting/fetchNewUpGoods',
    method: 'get'
  })
}
