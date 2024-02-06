export interface recommendResult {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}
//歌单推荐
export interface recommendObject {
  hasTaste: boolean
  code: number
  category: number
  result: recommendResult[]
}
//游客登录
export interface touristLoginType {
  code: number
  userId: number
  createTime: number
  cookie: string
}
//二维码状态
export interface qrStateType {
  code: number
  message: string
  cookie: string
}
