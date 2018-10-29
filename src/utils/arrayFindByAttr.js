/**
 * 根据属性查找数组元素，并返回
 * @param array
 * @param key
 * @param value
 * @param returnKey
 * @return {*}
 *
 * @author: Storm
 * @date: 2018/08/21
 */
export default (array, key, value, returnKey) => {
  if (!Array.isArray(array) || key === undefined || value === undefined) return
  const child = array.find(item => item[key] === value)
  if (!child) return
  return returnKey ? child[returnKey] : child
}
