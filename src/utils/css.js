/**
 * @author: Storm
 * @date: 2019-01-09
 * @email: wenyejie@foxmail.com
 */

import cb2cc from './cb2cc.js'

/**
 * 获取元素属性
 * @param element {Element} 元素
 * @param attrName {String} 元素属性
 * @param pseudoElement {String|null|undefined} 是否获取伪元素的属性
 * @return {String, Number, CSSStyleDeclaration}
 */
export const get = (element, attrName, pseudoElement = null) => {
  // 参数错误
  if (!element) return ''

  const computedStyle = document.defaultView.getComputedStyle(element, pseudoElement)

  // 判断是否有属性名称
  if (attrName) {
    return computedStyle[cb2cc(attrName)]
  } else {
    return computedStyle
  }
}

/**
 * 设置元素属性
 * @param element {Element} 元素
 * @param attrName {String, Object} 属性集合或属性名称
 * @param attrValue {String, Number?} 属性值
 * @return {void}
 */
export const set = (element, attrName, attrValue) => {
  // 判断传参是否正确
  if (!element || !attrName) return

  let styles = {}

  // 判断是否为字符串
  if (typeof attrName === 'string' && attrValue) {
    styles[attrName] = attrValue
  } else if (attrName && typeof attrName === 'object') { // 判断是否为对象, 并且不为空
    styles = attrName
  }

  for (let key in styles) {
    // 判断是否自身属性
    if (styles.hasOwnProperty(key)) {
      element.style[cb2cc(key)] = styles[key]
    }
  }
}

export default {
  get,
  set
}
