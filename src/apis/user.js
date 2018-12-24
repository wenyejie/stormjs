/**
 * 用户管理操作
 *
 * @author: Storm
 * @date: 2018-12-12
 */

import http from '../cores/http'

/**
 * 获取用户列表
 * @param params {Object}
 * @return {Promise}
 */
export const list = (params) => {
  return http.get('/user/list', { params })
}

export default {
  list
}
