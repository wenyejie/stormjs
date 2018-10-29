/**
 * 中文转拼音
 *
 * @author: Storm
 * @date: 2018/09/14
 */
import pinyins from '../datas/pinyins'
import isString from './isString'

export default (data, opts) => {
  const params = Object.assign({ isFirstLetter: false, isSpace: false }, { ...opts })
  if (!isString(data)) return data
  return data.replace(/[\u4e00-\u9fa5]/g, (match, offset) => {
    // console.log(match, offset, str)
    for (let key in pinyins) {
      if (pinyins[key].includes(match)) {
        if (params.isFirstLetter) {
          return key.substr(0, 1)
        }
        if (params.isSpace && offset !== 0) {
          return ' ' + key
        }
        return key
      }
    }
    return match
  })
}
