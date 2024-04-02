import request from './request'
import { getCookie } from '@renderer/utils/cookie'
//游客登录
export const touristLoginApi = () =>
  request({
    url: '/register/anonimous'
  })
//获取二维码key
export const getQrKey = () =>
  request({
    url: `/login/qr/key?timestamp=${new Date().getTime()}`
  })
//二维码生成
export const getQrImg = (data: { key: string }) =>
  request({
    url: `/login/qr/create?key=${data.key}&qrimg=${data.key}&timestamp=${new Date().getTime()}`
  })

//查看二维码状态
export const getQrState = (data: { key: string }) =>
  request({
    url: `/login/qr/check?key=${data.key}&timestamp=${new Date().getTime()}&noCookie=true`
  })

//获取用户信息
export const getUserInfoMsg = () =>
  request({
    url: `/user/account?cookie=${getCookie()}`
  })
export const getCaptcha = (phone: string) => {
  return request({
    url: `/captcha/sent?phone=${phone}`
  })
}
export const checkoutCaptcha = (data: { captcha: string; phone: string }) =>
  request({
    url: `/captcha/verify?captcha=${data.captcha}&phone=${data.phone}`
  })
export const login = (data: { phone: string; password?: string; captcha?: string }) => {
  if (data.captcha) {
    return request({
      url: `/login/cellphone?noCookie=true`,
      method: 'post',
      data: {
        phone: data.phone,
        captcha: data.captcha
      }
    })
  } else {
    return request({
      url: `/login/cellphone?noCookie=true`,
      method: 'post',
      data: {
        phone: data.phone,
        password: data.password
      }
    })
  }
}
