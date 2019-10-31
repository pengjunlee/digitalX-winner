import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(name) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { name }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function updatePassword(data) {
  return request({
    url: '/password/update',
    method: 'post',
    data
  })
}

export function userList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

