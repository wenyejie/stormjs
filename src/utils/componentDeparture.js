/**
 * @author: Storm
 * @date: 2019-01-09
 * @email: wenyejie@foxmail.com
 */
import Vue from 'vue'
import { set as cssSet } from './css.js'
import isElement from './isElement.js'

const defaultOptions = Object.freeze({
  offset: 5,
  /**
   * 组件定位
   * top, top-start, top-end, right, right-start, right-end,
   * bottom, bottom-start, bottom-end, left, left-start, left-end
   */
  position: 'bottom-start'
})

// 下标
let zIndex = 2048

export default {

  /**
   * 计算元素位置
   * @param $element {Element} 元素
   * @param $parent {Element} 父元素
   * @param options {Object?} 选项
   */
  compute ($element, $parent, options) {
    zIndex++

    let top = 0
    let left = 0
    const elRect = $element.getBoundingClientRect()
    const parentRect = $parent.getBoundingClientRect()
    const innerHeight = window.innerHeight
    // const innerWidth = window.innerWidth
    const offset = options.offset

    // left compute
    switch (options.position) {
      case 'top-start':
      case 'bottom-start':
        left = parentRect.left
        break
      default:
        break
    }

    // top compute
    switch (options.position) {
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        const tempTop = parentRect.top + parentRect.height + offset
        const overstepTop = innerHeight - tempTop - elRect.height
        if (overstepTop < 0) {
          top = tempTop + overstepTop
        } else {
          top = tempTop
        }
        break
      default:
        break
    }

    cssSet($element, {
      left: `${left}px`,
      top: `${top}px`,
      zIndex: zIndex
    })
    $element.isBodyAppend = true
  },
  /**
   * 展示元素并计算位置
   * @param $element {Element} 元素
   * @param $parent {Element} 父元素
   * @param options {Object?} 选项
   */
  show ($element, $parent, options) {
    if (!isElement($element)) return
    options = Object.assign({}, defaultOptions, options)
    if (!$element.isBodyAppend) {
      document.body.appendChild($element)
      Vue.nextTick(this.compute.bind(null, $element, $parent, options))
    } else {
      this.compute($element, $parent, options)
    }

  },

  /**
   * 从body重移除元素
   * @param $element {Element} 元素
   */
  destroy ($element) {
    document.body.removeChild($element)
  }
}
