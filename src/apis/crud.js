/**
 * VCS账号管理
 *
 * @author: Storm
 * @date: 2018/11/08
 */
import http from '../cores/http'

// 列表
export const list = (params) => {
  return http.get('/vcsAccount', { params })
}

// 删除
export const del = (id) => {
  return http.delete(`/vcsAccount/${id}`)
}

// 新增
export const add = (params) => {
  return http.post('/vcsAccount', params, { json: true })
}

// 更新
export const update = (id, params) => {
  return http.put(`/vcsAccount/${id}`, params, { json: true })
}

export default {
  list,
  del,
  add,
  update
}
