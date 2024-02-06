import { defineStore } from 'pinia'
import { getrecommend } from '@renderer/api'
import { recommendResult } from './type'
export const useRecommendStore = defineStore({
  id: 'recommendList',
  state: () => {
    return {
      detailRecommendList: [] as recommendResult[]
    }
  },
  actions: {
    async getRecommendList(limit: number) {
      try {
        const res: any = await getrecommend({ limit })
        this.detailRecommendList = res.result
        console.log(this.simpleRecommendList)
      } catch (err) {
        console.log(err)
      }
    }
  },
  getters: {
    simpleRecommendList: (state) =>
      state.detailRecommendList.map((item) => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          playCount: item.playCount
        }
      })
  }
})
