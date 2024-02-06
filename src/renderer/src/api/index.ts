import request from './request'
import { getCookie } from '@renderer/utils/cookie'
export const getbanner = () => {
  return request({
    url: `/banner`
  })
}
export const getrecommend = (data: { limit: number }) => {
  return request({
    url: `/personalized?limit=${data.limit}`
  })
}

export const getrecommendDaySongs = () => {
  return request({
    url: `/recommend/songs?cookie=${getCookie()}`
  })
}
