/**
 * 移除空格
 *
 * @author: Storm
 * @date: 2018/11/21
 */

import isString from '../utils/isString'

export default (input) => {
  if (isString(input)) return input.trim()
  return input
}
