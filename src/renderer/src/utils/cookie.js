import jscookie from 'js-cookie'

const Token = 'cloud-token'
//保存Token
export const setCookie = (value) => {
  jscookie.set(Token, value)
}
//获取Token
export const getCookie = () => {
  return jscookie.get(Token)
}
//删除Token
export const removeCookie = () => {
  jscookie.remove(Token)
}
