/* eslint-disable no-useless-escape */
/**
 *
 *
 * @author: Storm
 * @date: 2018/09/12
 */

/**
 * regexp
 *
 * author: Storm
 * date: 2017/08/04
 */

// emoji
export const emoji = /[\uD83C\uD83D\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig

// tel
export const tel = /^1\d{10}$/

// email
export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// int2decimal, 整数.两位小数
export const int2decimal = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

// letter
export const letter = /^[A-z]+$/

//
export const number = /[+|-]?(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]+$)/

// integer
export const integer = /^\d+$/

// chinese
export const cn = /^[\u4e00-\u9fa5]+$/

// 姓名
export const name = /^[\u4E00-\u9FA5|·]{2,}$/

// 身份证号码
export const certNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([012]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([012]\d)|3[0-1])\d{3}([0-9]|X)$/

// url地址
export const url = /^https?:\/\/([\w\d]+\.)+\w+(\/[\w\d-_]+)+$/

// IP地址
export const ip = /^\d{1,3}(\.\d{1,3}){3}$/

// 验证码
export const smsCode = /^\d{4,6}$/

export default {
  emoji,
  tel,
  email,
  int2decimal,
  letter,
  cn,
  certNo,
  smsCode,
  name,
  integer,
  number,
  url,
  ip
}
