import { defineStore } from 'pinia'
import { getSonglist, getSongListComments } from '@renderer/api'
import { Playlist, CommentType } from './type'
export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlist: [],
    SongListSimInfo: {} as Playlist,
    comments: [] as CommentType[],
    hotComments: [] as CommentType[],
    topComments: [] as CommentType[],
    commentsTotal: 0
  }),
  actions: {
    async getSonglist(id: string) {
      try {
        const res: any = await getSonglist({ id })
        console.log(res)
        this.SongListSimInfo = res.playlist
      } catch (err) {
        console.log(err)
      }
    },
    async getComments(data: { id: string; limit: number; offset: number }) {
      try {
        const res: any = await getSongListComments(data)
        console.log(res)
        this.comments = res.comments
        this.hotComments = res.hotComments
        this.topComments = res.topComments
        this.commentsTotal = res.total
      } catch (err) {
        console.log(err)
      }
    }
  },
  getters: {
    SongSimInfo(state) {
      return state.SongListSimInfo.tracks
    }
  }
})
