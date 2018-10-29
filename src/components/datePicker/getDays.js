/**
 * 获取当前月份的展示天数
 *
 * @author: Storm
 * @date: 2018/07/30
 */

import isOneDay from '../../utils/isOneDay'

const getDay = (value, opts) => Object.assign({ value }, { selected: false, disabled: false, other: false }, opts)

const getDetail = date => {
  if (!date) return {}
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
}

export default (date, opts) => {
  const hasVal = !!date
  date = hasVal ? date : new Date()
  const { year, month, day } = getDetail(date)

  // 本月
  const lastDate = new Date(year, month + 1, 0)
  const lastDay = lastDate.getDate()

  // 上个月
  const prevLastDate = new Date(year, month, 0)
  const prevLastDay = prevLastDate.getDate()
  const prevLastWeek = prevLastDate.getDay()

  // 下个月
  const nextLastDate = new Date(year, month + 1, 1)
  const nextLastWeek = nextLastDate.getDay()

  const days = []

  for (let i = prevLastWeek; i >= 0; i--) {
    prevLastDate.setDate(prevLastDay - i)
    days.push(getDay(prevLastDay - i, {
      other: true,
      prev: true,
      disabled: (opts.min && opts.min > prevLastDate) || (opts.max && opts.max < prevLastDate)
    }))
  }

  for (let i = 1; i <= lastDay; i++) {
    const thisDay = new Date(year, month, i)
    days.push(getDay(i, {
      today: isOneDay(thisDay),
      selected: hasVal && day === i,
      disabled: (opts.min && opts.min > thisDay) || (opts.max && opts.max < thisDay)
    }))
  }

  for (let i = nextLastWeek, y = 1; i < 7; i++, y++) {
    nextLastDate.setDate(y)
    days.push(getDay(y, {
      other: true,
      next: true,
      disabled: (opts.min && opts.min > nextLastDate) || (opts.max && opts.max < nextLastDate)
    }))
  }

  return [[], [], [], [], [], []].map((item, index) => item.concat(days.slice(index * 7, index * 7 + 7)))
}
