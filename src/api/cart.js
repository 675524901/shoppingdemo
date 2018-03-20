import fetch from '../utils/fetch'

export function addSeveralCart(data) {
  return fetch({
    url: '/nodeapi/cart/addSeveralCart',
    method: 'post',
    data
  })
}
