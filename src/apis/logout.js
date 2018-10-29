/**
 *
 *
 * @author: Storm
 * @date: 2018/08/17
 */

import http from '../cores/http'

// 登出
export default () => {
  return http.get('/logout', {
    baseURL: process.env.VUE_APP_REQUEST_LOG_URL
  })
}
