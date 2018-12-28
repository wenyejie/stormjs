/**
 * 根据数组子节点的值, 移除数组
 *
 * @author: Storm
 * @date: 2018/08/03
 */

export default (ary, value) => {
  if (!Array.isArray(ary)) return ary
  const index = ary.findIndex(item => item === value)
  if (index >= 0) {
    ary.splice(index, 1)
  }
  return ary
}
