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
//轮播图
export interface Banner {
  imageUrl: string
  targetId: number
  adid?: any
  targetType: number
  titleColor: string
  typeTitle: string
  url?: any
  exclusive: boolean
  monitorImpress?: any
  monitorClick?: any
  monitorType?: any
  monitorImpressList?: any
  monitorClickList?: any
  monitorBlackList?: any
  extMonitor?: any
  extMonitorInfo?: any
  adSource?: any
  adLocation?: any
  adDispatchJson?: any
  encodeId: string
  program?: any
  event?: any
  video?: any
  song?: any
  scm: string
  bannerBizType: string
}
//歌单歌曲简略信息
export interface RelatedVideo {
  [xxx: string]: any
}

export interface Subscriber {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags?: any
  experts?: any
  djStatus: number
  vipType: number
  remarkName?: any
  authenticationTypes: number
  avatarDetail?: any
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

export interface AvatarDetail {
  userType: number
  identityLevel: number
  identityIconUrl: string
}

export interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags?: any
  experts?: any
  djStatus: number
  vipType: number
  remarkName?: any
  authenticationTypes: number
  avatarDetail: AvatarDetail
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

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

export interface Track {
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

export interface TrackId {
  id: number
  v: number
  t: number
  at: number
  alg?: any
  uid: number
  rcmdReason: string
  sc?: any
  f?: any
  sr?: any
}

export interface Playlist {
  id: number
  name: string
  coverImgId: number
  coverImgUrl: string
  coverImgId_str: string
  adType: number
  userId: number
  createTime: number
  status: number
  opRecommend: boolean
  highQuality: boolean
  newImported: boolean
  updateTime: number
  trackCount: number
  specialType: number
  privacy: number
  trackUpdateTime: number
  commentThreadId: string
  playCount: number
  trackNumberUpdateTime: number
  subscribedCount: number
  cloudTrackCount: number
  ordered: boolean
  description: string
  tags: string[]
  updateFrequency?: any
  backgroundCoverId: number
  backgroundCoverUrl?: any
  titleImage: number
  titleImageUrl?: any
  englishTitle?: any
  officialPlaylistType?: any
  copied: boolean
  relateResType?: any
  subscribers: Subscriber[]
  subscribed?: any
  creator: Creator
  tracks: Track[]
  videoIds?: any
  videos?: any
  trackIds: TrackId[]
  bannedTrackIds?: any
  mvResourceInfos?: any
  shareCount: number
  commentCount: number
  remixVideo?: any
  sharedUsers?: any
  historySharedUsers?: any
  gradeStatus: string
  score?: any
  algTags?: any
  trialMode: number
}

export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType?: any
  cannotListenReason?: any
  playReason?: any
}

export interface ChargeInfoList {
  rate: number
  chargeUrl?: any
  chargeMessage?: any
  chargeType: number
}

export interface Privilege {
  id: number
  fee: number
  payed: number
  realPayed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  pc?: any
  toast: boolean
  flag: number
  paidBigBang: boolean
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: string
  playMaxBrLevel: string
  downloadMaxBrLevel: string
  plLevel: string
  dlLevel: string
  flLevel: string
  rscl?: any
  freeTrialPrivilege: FreeTrialPrivilege
  rightSource: number
  chargeInfoList: ChargeInfoList[]
}

export interface songList {
  code: number
  relatedVideos: RelatedVideo
  playlist: Playlist
  urls?: any
  privileges: Privilege[]
  sharedPrivilege?: any
  resEntrance?: any
  fromUsers?: any
  fromUserCount: number
  songFromUsers?: any
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

export interface Decoration {
  repliedByAuthorCount: number
}

export interface IpLocation {
  ip?: any
  location: string
  userId?: any
}

export interface CommentType {
  user: User
  beReplied: any[]
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
