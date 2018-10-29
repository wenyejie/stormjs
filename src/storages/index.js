/**
 *
 *
 * @author: Storm
 * @date: 2018/08/16
 */
import local from './local'
import { loginInfo, userInfo, userPermission } from './namespaces'

export const sLoginInfo = (value) => local(loginInfo, value)

export const sUserInfo = (value) => local(userInfo, value)

export const sUserPermission = (value) => local(userPermission, value)
