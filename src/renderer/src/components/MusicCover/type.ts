//歌曲列表信息
export interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

export interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

export interface H {
  br: number
  fid: number
  size: number
  vd: number
}

export interface M {
  br: number
  fid: number
  size: number
  vd: number
}

export interface L {
  br: number
  fid: number
  size: number
  vd: number
}

export interface Sq {
  br: number
  fid: number
  size: number
  vd: number
}

export interface Hr {
  br: number
  fid: number
  size: number
  vd: number
}

export interface VideoInfo {
  moreThanOne: boolean
  video?: any
}

export interface SongListType {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia?: any[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt?: any
  cf: string
  al: Al
  dt: number
  h: H
  m: M
  l: L
  sq: Sq
  hr: Hr
  a?: any
  cd: string
  no: number
  rtUrl?: any
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData?: any
  tagPicList?: any
  resourceState: boolean
  version: number
  songJumpInfo?: any
  entertainmentTags?: any
  awardTags?: any
  single: number
  noCopyrightRcmd?: any
  rtype: number
  rurl?: any
  mst: number
  cp: number
  mv: number
  publishTime: number
  videoInfo: VideoInfo
}

//评论
export interface User {
  locationInfo?: any
  liveInfo?: any
  anonym: number
  commonIdentity?: any
  avatarDetail?: any
  userType: number
  avatarUrl: string
  followed: boolean
  mutual: boolean
  remarkName?: any
  socialUserId?: any
  vipRights?: any
  nickname: string
  authStatus: number
  expertTags?: any
  experts?: any
  vipType: number
  userId: number
  target?: any
}

export interface User {
  locationInfo?: any
  liveInfo?: any
  anonym: number
  commonIdentity?: any
  avatarDetail?: any
  userType: number
  avatarUrl: string
  followed: boolean
  mutual: boolean
  remarkName?: any
  socialUserId?: any
  vipRights?: any
  nickname: string
  authStatus: number
  expertTags?: any
  experts?: any
  vipType: number
  userId: number
  target?: any
}

export interface IpLocation {
  ip?: any
  location: string
  userId?: any
}

export interface BeReplied {
  user: User
  beRepliedCommentId: number
  content: string
  richContent?: any
  status: number
  expressionUrl?: any
  ipLocation: IpLocation
}

export interface Decoration {
  repliedByAuthorCount?: number
}

export interface IpLocation {
  ip?: any
  location: string
  userId?: any
}

export interface CommentType {
  user: User
  beReplied: BeReplied[]
  pendantData?: any
  showFloorComment?: any
  status: number
  commentId: number
  content: string
  richContent?: any
  contentResource?: any
  time: number
  timeStr: string
  needDisplayTime: boolean
  likedCount: number
  expressionUrl?: any
  commentLocationType: number
  parentCommentId: number
  decoration: Decoration
  repliedMark?: any
  grade?: any
  userBizLevels?: any
  ipLocation: IpLocation
  owner: boolean
  liked: boolean
}
