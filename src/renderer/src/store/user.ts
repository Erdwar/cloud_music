import { defineStore } from 'pinia'
import {
  touristLoginApi,
  getQrImg,
  getQrKey,
  getQrState,
  getUserInfoMsg,
  login
} from '@renderer/api/user'
import { setCookie, getCookie } from '@renderer/utils/cookie'
// import { qrStateType } from './type'
// import { touristLoginType } from './type'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: '',
      password: '',
      qrkey: '',
      qrimg: '',
      qrurl: '',
      qrstatus: 801,
      userInfo: {}
    }
  },
  actions: {
    //游客登陆
    async touristLogin() {
      try {
        const res: any = await touristLoginApi()
        setCookie(res.cookie)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取二维码key
    async getQr() {
      try {
        const res1 = await getQrKey()
        this.qrkey = res1.data.unikey
        const res2 = await getQrImg({ key: this.qrkey })
        this.qrimg = res2.data.qrimg
        this.qrurl = res2.data.qrurl
      } catch (err) {
        console.log(err)
      }
    },
    async checkQrState() {
      try {
        const res: any = await getQrState({ key: this.qrkey })
        this.qrstatus = res.code
        if (this.qrstatus === 803) {
          console.log(res.cookie, 'stop')
          setCookie(res.cookie)
          console.log(getCookie())

          this.getUserInfo()
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getUserInfo() {
      try {
        const res: any = await getUserInfoMsg()
        console.log(res)

        // setCookie(res.cookie)
      } catch (err) {
        console.log(err)
      }
    },
    async Alogin(data: { phone: string; captcha?: string; password?: string }) {
      try {
        const res: any = await login(data)
        setCookie(res.cookie)
        return Promise.resolve(true)
      } catch (err) {
        console.log(err)
        return Promise.resolve(false)
      }
    }
  }
})
