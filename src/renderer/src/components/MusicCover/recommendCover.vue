<template>
  <div class="content">
    <div class="cover">
      <img :src="recommendMsg.picUrl + '?param=134y134'" alt="" srcset="" />
      <div class="play">
        <div class="iconfont icon-bofang bofang"></div>
      </div>
      <div class="play-count">
        <span class="iconfont icon-playCount playCount"></span>
        <span>{{
          recommendMsg.playCount > 10000
            ? recommendMsg.playCount > 10000
              ? (recommendMsg.playCount / 10000).toFixed() + '万'
              : (recommendMsg.playCount / 10000).toFixed(1) + '万'
            : recommendMsg.playCount
        }}</span>
      </div>
    </div>
    <div class="name">{{ recommendMsg.name }}</div>
  </div>
</template>
<script setup lang="ts">
interface recommendMsgType {
  picUrl: string
  playCount: number
  name: string
  id: number
}
defineProps({
  recommendMsg: {
    type: Object as () => recommendMsgType,
    default: () => ({})
  }
})
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cover {
    position: relative;
    width: 100%;
    display: flex;
    & > img {
      width: 100%;
      object-position: center;
      object-fit: fill;
      border-radius: 5px;
      cursor: pointer;
      &:hover + .play {
        opacity: 1;
      }
    }
    .play-count {
      position: absolute;
      top: 5%;
      right: 5%;
      font-size: 1rem;
      display: flex;
      align-items: center;
      color: #e8e8e8;
      .playCount {
        font-size: 1.2rem;
      }
    }
    .play {
      position: absolute;
      bottom: 5%;
      right: 5%;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e8e8e8;
      opacity: 0;
      transition: all 1s ease;
      .bofang {
        font-size: 2rem;
        color: #ec4141;
      }
    }
  }
  .name {
    width: 100%;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.3rem;
    line-height: 1.6rem;
    height: 3.2rem;
    cursor: pointer;
  }
}
</style>
