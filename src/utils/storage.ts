
/**
 * storage
 *
 * author: Storm
 * date: 2017/07/31
 */

// 无痕模式
const incognito = (error: string): void => {
  console.log(error)
}

export default (name: string): any => {
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
    get (key: string): any {
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
    set (key: string, value: any): void {
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
    remove (key: string): void {
      try {
        for (let i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] === 'string') storage.removeItem(arguments[i])
          if (Array.isArray(arguments[i])) arguments[i].forEach((value: any) => storage.removeItem(value))
        }
      } catch (error) {
        incognito(error)
      }
    },

    /**
     * 移除所有storage
     */
    clear (): void {
      try {
        storage.clear()
      } catch (error) {
        incognito(error)
      }
    },

    length (): number|undefined {
      try {
        return storage.length
      } catch (e) {
        incognito(e)
      }
    }
  }
}
