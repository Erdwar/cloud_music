<template>
  <div class="content">
    <Swiper :banners="banners"></Swiper>
    <div class="recommend">
      <KindsTitle :title="recommendMsg.title" :path-name="recommendMsg.pathName"></KindsTitle>
      <div class="recommend-list">
        <div v-for="item in simpleRecommendList" :key="item.id" class="recommend-item">
          <recommend-cover :recommend-msg="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import KindsTitle from '@renderer/components/Base/KindsTitle.vue'
import { getrecommendDaySongs } from '@renderer/api'
import { useRecommendStore } from '@renderer/store/recommend'
import { storeToRefs } from 'pinia'
import Swiper from '@renderer/components/Base/Swiper.vue'
import recommendCover from '@renderer/components/MusicCover/recommendCover.vue'

const recommendStore = useRecommendStore()
const { simpleRecommendList, banners } = storeToRefs(recommendStore)

const recommendMsg = reactive({
  title: '推荐歌单',
  pathName: '/',
  detailList: []
})
const getrecommendDaySongsMsg = async () => {
  try {
    const res: any = await getrecommendDaySongs()
    console.log(res, '每日推荐歌曲')
  } catch (err) {
    console.log(err)
  }
}
await recommendStore.getBannerMsg()
// getrecommendDaySongsMsg()
recommendStore.getRecommendList(10)
onMounted(() => {})
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-carousel {
    width: 100%;
    .el-carousel__item {
      border-radius: 10px;
      & > img {
        max-width: 100%;
        max-height: 100%;
        object-position: center;
        object-fit: cover;
      }
    }
  }
  .recommend {
    width: 100%;
    .recommend-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .recommend-item {
        box-sizing: border-box;
        width: 20%;
        padding: 8px;
      }
    }
  }
}
</style>
