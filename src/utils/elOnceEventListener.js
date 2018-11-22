/**
 * 当点击元素外部时, 执行回调
 *
 * @author: Storm
 * @date: 2018/11/02
 */

export default {
  add (eventFn, element = document) {
    element.addEventListener('click', eventFn, { once: true })
  },
  remove (eventFn, element = document) {
    element.removeEventListener('click', eventFn)
  }
}
