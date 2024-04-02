import jscookie from 'js-cookie'

const Cookie = 'cloud-Cookie'
//保存Cookie
export const setCookie = (value: string) => {
  console.log(12313, value)
  jscookie.set(Cookie, value)
}
//获取Cookie
export const getCookie = () => {
  return jscookie.get(Cookie)
}
//删除Cookie
export const removeCookie = () => {
  jscookie.remove(Cookie)
}
