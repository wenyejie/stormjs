/**
 * 时间转换
 * @param date {*}
 *
 * @author: Storm
 * @date: 2018/05/10
 */

import isValidDate from './isValidDate'

export default (date, defDate) => {
  if (isValidDate(date)) return date
  if (!date) return defDate

  // 如果是纯数字的字符串则转换成number类型
  if (typeof date === 'string' && /^\d+$/.test(date)) date = parseInt(date)
  if (typeof date === 'number') {
    // 如果超出13位, 则截取前十三位, 兼容纳秒级时间戳
    if ((date + '').length > 13) date = parseInt((date + '').substr(0, 13))

    // is NaN
    if (Number.isNaN(date)) return defDate

    // 小于秒级时间戳
    if (date / 1e9 < 1) return defDate

    // 秒级时间戳, 转换成毫秒级时间戳
    if (date / 1e9 > 1 && (date + '').length === 10) date = date * 1e3
  }
  date = new Date(date)

  if (date.toString() === 'Invalid Date') return defDate
  return date
}
