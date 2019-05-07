/**
 *
 *
 * @author: Storm
 * @date: 2018/08/06
 */

import isElement from './isElement'

/**
 * add class
 * @param target 目标元素
 * @param className 样式名称
 */
export const addClass = (target, className) => {
  if (!isElement(target)) return
  target.classList.add(className)
}

/**
 * remove class
 * @param target 目标元素
 * @param className 样式名称
 */
export const removeClass = (target, className) => {
  if (!isElement(target)) return
  target.classList.remove(className)
}

/**
 * 增加监听器
 * @param target 目标
 * @param eventName 时间名称
 * @param callback 回调
 * @param options 选项
 */
export const on = (target, eventName, callback, options) => {
  if (!isElement(target)) return
  target.addEventListener(eventName, callback, options)
}

/**
 * 移除监听器
 * @param target 目标
 * @param eventName 事件名称
 * @param callback 回调
 */
export const off = (target, eventName, callback) => {
  if (!isElement(target)) return
  target.removeEventListener(eventName, callback)
}
