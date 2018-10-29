/**
 * 数组移除添加子集
 *
 * @author: Storm
 * @date: 2018/08/27
 */

export default (array, value) => {
  if (array.includes(value)) {
    const index = array.findIndex(item => item === value)
    array.splice(index, 1)
  } else {
    array.push(value)
  }
  return array
}
