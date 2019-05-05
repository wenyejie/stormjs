/**
 * 获取对象属性
 *
 * @author: Storm
 * @date: 2018/10/18
 */

import isObject from './isObject'

export default (obj, ...keys) => {
  const result = {}
  if (!isObject(obj)) return result
  for (let key of keys) result[key] = obj[key]
  return result
}
