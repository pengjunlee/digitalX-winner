import request from '@/utils/request'

export function shopList(query) {
  return request({
    url: '/tmall/shop/list',
    method: 'get',
    params: query
  })
}

export function goodsList(query) {
  return request({
    url: '/tmall/goods/list/',
    method: 'get',
    params: query
  })
}