/**
 * storage
 *
 * author: Storm
 * date: 2017/07/31
 */

// 无痕模式
const incognito = (error) => {
  console.log(error)
}

export default (name) => {
  if (name !== 'session' && name !== 'local') {
    console.log('storage.js name must be "local" or "session"')
    return {}
  }

  const storage = typeof window !== 'undefined' ? window[name + 'Storage'] : {}

  return {

    /**
     * 获取本地存储的值
     * @param key
     */
    get (key) {
      try {
        return (JSON.parse(storage.getItem(key)) || { value: undefined }).value
      } catch (error) {
        incognito(error)
      }
    },

    /**
     * 设置本地存储
     * @param key 键
     * @param value 值
     */
    set (key, value) {
      try {
        storage.setItem(key, JSON.stringify({ value }))
      } catch (error) {
        incognito(error)
      }
    },

    /**
     * 移除本地存储
     * @param key
     */
    remove (key) {
      try {
        for (let i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] === 'string') storage.removeItem(arguments[i])
          if (Array.isArray(arguments[i])) arguments[i].forEach((value) => storage.removeItem(value))
        }
      } catch (error) {
        incognito(error)
      }
    },

    /**
     * 移除所有storage
     */
    clear () {
      try {
        storage.clear()
      } catch (error) {
        incognito(error)
      }
    },

    length () {
      try {
        return storage.length
      } catch (e) {
        incognito(e)
      }
    }
  }
}
