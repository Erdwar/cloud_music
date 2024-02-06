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
    url: '/login/qr/key'
  })
//二维码生成
export const getQrImg = (data: { key: string }) =>
  request({
    url: `/login/qr/create?key=${data.key}&qrimg=${data.key}`
  })

//
export const getQrState = (data: { key: string }) =>
  request({
    url: `/login/qr/check?key=${data.key}`
  })

//获取用户信息
export const getUserInfoMsg = () =>
  request({
    url: `/user/account?cookie=${getCookie()}`
  })
