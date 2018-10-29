/**
 *
 *
 * @author: Storm
 * @date: 2018/08/16
 */
import local from './local'
import { loginInfo, userInfo, userPermission } from './namespaces'

export const sLoginInfo = (value?: any) => local(loginInfo, value)

export const sUserInfo = (value?: any) => local(userInfo, value)

export const sUserPermission = (value?: any) => local(userPermission, value)
