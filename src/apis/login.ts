/**
 *
 *
 * @author: Storm
 * @date: 2018/08/17
 */

import http from '../cores/http'

type Params = { loginName: string, password: string }

// 登入
export default ({ loginName, password }: Params) => {
  return http.post('/login', { loginName, password }, {
    baseURL: process.env.VUE_APP_REQUEST_LOG_URL
  })
}
