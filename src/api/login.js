import fetch from '../utils/fetch'

export function userLogin(data) {
  return fetch({
    url: '/nodeapi/users/login',
    method: 'post',
    data
  })
}

export function userRegister(data) {
  return fetch({
    url: '/nodeapi/users/register',
    method: 'post',
    data
  })
}

export function checkAccount(data) {
  return fetch({
    url: '/nodeapi/users/checkAccount',
    method: 'get',
    params: data
  })
}

