<template>
  <div class="side-bar">
    <navModel v-model:selectId="selectId" :navlist="navList" />
    <navModel v-model:selectId="selectId" :navlist="subNav.navList" :title="subNav.title" />
    <navModel v-model:selectId="selectId" :navlist="playlist.navList" :title="playlist.title" />
    <!-- <div class="nav-main">
      <div
        v-for="item in navList"
        :key="item.id"
        class="nav-main-item"
        :class="selectId === item.id ? 'active' : ''"
        @click="goTo(item.pathname, item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="nav-sub">
      <div class="nav-sub-title">我的音乐</div>
      <div
        v-for="item in subnavList"
        :key="item.id"
        class="nav-sub-item"
        :class="selectId === item.id ? 'active' : ''"
        @click="goTo(item.pathname, item.id)"
      >
        <div class="iconfont" :class="`icon-${item.icon}`"></div>
        {{ item.name }}
      </div>
    </div>
    <div class="nav-songlist">
      <div class="nav-songlist-title">创建的歌单</div>
      <el-icon color="#cec1af"><CaretRight /></el-icon>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import navModel from '@comp/Base/navModel.vue'

const selectId = ref('n0')
const navList = [
  {
    id: 'n0',
    name: '发现音乐',
    pathname: '/'
  },
  {
    id: 'n1',
    name: '播客',
    pathname: '/'
  },
  {
    id: 'n2',
    name: '视频',
    pathname: '/'
  },
  {
    id: 'n3',
    name: '关注',
    pathname: '/'
  },
  {
    id: 'n4',
    name: '直播',
    pathname: '/'
  },
  {
    id: 'n5',
    name: '私人漫游',
    pathname: '/'
  }
]
const subNav = {
  navList: [
    {
      id: 's0',
      icon: 'love',
      name: '我喜欢的音乐',
      pathname: '/'
    },
    {
      id: 's1',
      icon: 'xiazai',
      name: '本地与下载',
      pathname: '/'
    },
    {
      id: 's2',
      icon: 'zuijin',
      name: '最近播放',
      pathname: '/'
    }
  ],
  title: {
    name: '我的音乐'
  }
}
const playlist = {
  navList: [
    {
      id: 'p0',
      pathname: '/',
      name: '我喜欢的音乐'
    }
  ],
  title: {
    name: '创建的歌单',
    isRight: true,
    isAdd: true,
    isClose: true
  }
}
</script>
<style lang="less" scoped>
.side-bar {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px 5px 5px 0;
  border-right: 2px solid #f7f7f7;
  .nav-main {
    width: 100%;
    font-size: 1.4rem;
    .nav-main-item {
      width: 100%;
      height: 30px;
      // font-size: 1.4rem;
      line-height: 30px;
      padding-left: 2px;
      margin: 3px 0;
      cursor: pointer;
      &:hover {
        background-color: #f6f6f7;
      }
    }
  }
  .nav-sub {
    width: 100%;
    margin-top: 10px;
    .nav-sub-title {
      color: #cec1af;
    }
    .nav-sub-item {
      width: 100%;
      height: 30px;
      font-size: 1.4rem;
      line-height: 30px;
      padding-left: 2px;
      margin: 3px 0;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #f6f6f7;
      }
      & > div {
        margin-right: 5px;
      }
    }
  }
  .nav-songlist {
    width: 100%;
    margin-top: 10px;
  }
}
.active {
  background-color: #f6f6f7;
  font-size: 1.6rem;
  font-weight: 700;
}
</style>
