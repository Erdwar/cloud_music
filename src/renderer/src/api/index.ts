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

export const getSonglist = (data: { id: string }) => {
  return request({
    url: `/playlist/detail?id=${data.id}`
  })
}
export const getSongListComments = (data: { id: string; limit: number; offset: number }) => {
  return request({
    url: `/comment/playlist?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  })
}
