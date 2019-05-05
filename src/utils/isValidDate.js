/**
 * 判断数据是否为函数
 *
 * @author: Storm
 * @date: 2018/02/26
 */
import isDate from './isDate'

export default obj => isDate(obj) && obj.toString() !== 'Invalid Date'
