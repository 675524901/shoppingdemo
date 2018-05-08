import fetch from '../utils/fetch'

export function fetchSettings(data) {
  return fetch({
    url: '/nodeapi/setting/fetchSettings',
    method: 'get',
    params: data
  })
}
