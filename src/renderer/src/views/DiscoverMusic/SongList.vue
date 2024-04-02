<template>
  <div class="songlist-content">
    <div class="songlist-simsg">
      <div class="img">
        <img :src="SongListSimInfo.coverImgUrl" />
      </div>
      <div class="detail">
        <div class="title">
          <div class="tag">歌单</div>
          <div class="name">{{ SongListSimInfo.name }}</div>
        </div>
        <div class="author">
          <div class="avatar">
            <el-avatar :size="25" :src="SongListSimInfo.creator?.avatarUrl || ''" />
          </div>
          <div class="name">{{ SongListSimInfo.creator.nickname }}</div>
          <div class="created-time">
            {{ dayjs(SongListSimInfo.createTime).format('YYYY-MM-DD') }}创建
          </div>
        </div>
        <div class="caozuo">
          <div class="playAll">播放全部</div>
          <!-- <div class="caozuo-item">收藏()</div> -->
        </div>
        <div class="other">
          <div class="tag">
            标签:
            <span v-for="(tag, index) of SongListSimInfo.tags" :key="tag" class="tag-item"
              ><span v-if="index !== 0" class="split"> / </span> {{ tag }}
            </span>
          </div>
          <div class="count">
            歌曲:{{ SongListSimInfo.trackCount }} 播放:{{ SongListSimInfo.playCount }}
          </div>
          <div class="desc">简介:{{ SongListSimInfo.description }}</div>
        </div>
      </div>
    </div>
    <div class="songlist">
      <div class="songlist-nav">
        <div
          v-for="item in navList"
          :key="item.id"
          class="nav-item"
          :class="selectcomponent === item.componentName ? 'active' : ''"
          @click="goTo(item.componentName)"
        >
          <div class="nav-item-title">{{ item.name }}</div>
        </div>
      </div>
      <keep-alive>
        <component :is="selectcomponent" v-bind="params"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePlaylistStore } from '@renderer/store/playlist'
import SongListDetail from '@renderer/components/MusicCover/SongListDetail.vue'
import SongListComment from '@renderer/components/MusicCover/SongListComment.vue'
import songsListCollector from '@renderer/components/MusicCover/songsListCollector.vue'
import dayjs from 'dayjs'

const selectcomponent = shallowRef(SongListDetail)
const route = useRoute()
const store = usePlaylistStore()
const params = ref({})
const { SongListSimInfo } = storeToRefs(store)
const navList = computed(() => [
  {
    id: 0,
    name: '歌曲列表',
    componentName: SongListDetail
  },
  {
    id: 1,
    name: `评论(${SongListSimInfo.value.commentCount})`,
    componentName: SongListComment
  },
  {
    id: 2,
    name: '收藏者',
    componentName: songsListCollector
  }
])

const goTo = (component: any) => {
  switch (component) {
    case SongListComment:
      params.value = {
        id: route.params.id
      }
      break
    default:
      break
  }
  selectcomponent.value = component
}
await store.getSonglist(route.params.id as string)
</script>
<style lang="less" scoped>
.songlist-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  .songlist-simsg {
    width: 100%;
    display: flex;
    font-size: 1.3rem;
    .img {
      height: 180px;
      width: 180px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        object-position: center;
      }
    }
    .detail {
      flex: 1;
      padding: 0 10px;
      & > div {
        margin: 5px 0;
      }
      .title {
        display: flex;
        align-items: center;
        .tag {
          font-size: 1rem;
          padding: 0 2px;
          border-radius: 2px;
          border: 1px solid #ff9999;
          color: #ff9999;
        }
        .name {
          margin-left: 10px;
          font-size: 2rem;
          font-weight: 600;
        }
      }
      .author {
        display: flex;
        align-items: center;
        & > div {
          margin-left: 5px;
        }
        .avatar {
          cursor: pointer;
        }
        .name {
          cursor: pointer;
          color: #5d96ca;
        }
        .name,
        .created-time {
          font-size: 1rem;
        }
      }
      .caozuo {
        display: flex;
        align-items: center;
        .playAll {
          cursor: pointer;
          width: 10rem;
          height: 3rem;
          border-radius: 1.5rem;
          color: #fff;
          background-color: #ff6666;
          text-align: center;
          line-height: 3rem;
          font-size: 1.3rem;
        }
      }
      .other {
        & > div {
          margin: 5px 0;
        }
        .tag {
          .tag-item {
            color: #507daf;
            cursor: pointer;
            .split {
              color: #000;
              cursor: default;
            }
          }
        }
      }
    }
  }
  .songlist {
    width: 100%;
    .songlist-nav {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      .nav-item {
        margin: 0 20px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          border-bottom: 3px solid red;
          font-size: 1.6rem;
          font-weight: 700;
        }
        .nav-item-title {
          padding: 5px 0;
          margin-left: -10px;
          margin-right: -10px;
        }
      }
    }
  }
}
</style>
