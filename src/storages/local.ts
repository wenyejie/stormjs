/**
 *
 *
 * @author: Storm
 * @date: 2018/08/16
 */

import local from '../utils/localStorage'

export default (name: string, value: any): any => {
  if (!name) return
  switch (value) {
    case undefined:
      return local.get(name)
    case null:
      local.remove(name)
      break
    default:
      local.set(name, value)
      break
  }
}
