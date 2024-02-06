<template>
  <div class="discover">
    <div class="discover-nav">
      <div
        v-for="item in navList"
        :key="item.id"
        class="nav-item"
        :class="selectId === item.id ? 'active' : ''"
        @click="goTo(item.path, item.id)"
      >
        <div class="nav-item-title">{{ item.name }}</div>
      </div>
    </div>
    <div class="discover-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { navListType } from './type'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectId = ref(0)
const navList: Array<navListType> = [
  {
    id: 0,
    name: '个性推荐',
    path: 'recommend'
  },
  {
    id: 1,
    name: '专属定制',
    path: 'customization'
  },
  {
    id: 2,
    name: '歌单',
    path: 'songsList'
  },
  {
    id: 3,
    name: '排行榜',
    path: 'rankList'
  },
  {
    id: 4,
    name: '歌手',
    path: 'singer'
  },
  {
    id: 5,
    name: '最新音乐',
    path: 'newestSongs'
  }
]

const goTo = (path: string, id: number) => {
  selectId.value = id
  router.push({ name: path })
}
</script>
<style lang="less" scoped>
.discover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;
  .discover-nav {
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
        font-size: 2rem;
        font-weight: 700;
      }
      .nav-item-title {
        padding: 5px 0;
        margin-left: -10px;
        margin-right: -10px;
      }
    }
  }
  .discover-content {
    width: 100%;
    flex: 1;
  }
}
</style>
