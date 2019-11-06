import request from '@/utils/request'

export function commentGoodsList(query) {
  return request({
    url: '/comment/goods',
    method: 'get',
    params: query
  })
}

export function commentList(query) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: query
  })
}

export function wordsList(goodsId) {
  return request({
    url: '/comment/words/' + goodsId,
    method: 'get'
  })
}

