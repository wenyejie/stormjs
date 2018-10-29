/**
 *
 *
 * @author: Storm
 * @date: 2018/08/17
 */

import http from '../cores/http'

// 登入
export default ({ loginName, password }) => {
  return http.post('/login', { loginName, password }, {
    baseURL: process.env.VUE_APP_REQUEST_LOG_URL
  })
}
