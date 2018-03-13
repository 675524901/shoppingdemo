import request from './public'

export function userLogin(data) {
  return request({
    url: '/nodeapi/users/login',
    method: 'post',
    data
  })
}

export function userRegister(data) {
  return request({
    url: '/nodeapi/users/register',
    method: 'post',
    data
  })
}
