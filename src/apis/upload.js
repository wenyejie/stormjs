/**
 *
 *
 * @author: Storm
 * @date: 2018-12-07
 */

import http from '../cores/http'

const headers = {
  'X-zq-from-app': 'zhiqi-file',
  'Accept': '*/*',
  'Content-Type': 'multipart/form-data'
}
const baseURL = '/api/file'

// 上传
// 1 采集器脚本文件上传;2 指令脚本上传; 3 告警手段脚本上传; 100: 其它上传
// export const upload = (file, fileName, businessType = 100) => {
export const upload = (formData, config) => {
  return http.post('/file/upload', formData, Object.assign({
    headers,
    baseURL
  }, config))
}

export default { upload }
