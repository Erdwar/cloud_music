<template>
  <div class="content">
    <!-- <el-carousel :interval="2000" type="card" height="153px" class="el-carousel">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <img :src="item.imageUrl" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel> -->
    <swiper
      :modules="modules"
      :slides-per-view="1.5"
      :space-between="20"
      :observer="true"
      :observe-parents="true"
      effect="coverflow"
      :centered-slides="true"
      loop
      :navigation="{
        nextEl: '.nextEl',
        prevEl: '.prevEl'
      }"
      :coverflow-effect="{
        rotate: 0,
        scale: 0.9,
        modifier: 1,
        stretch: 314
      }"
      :pagination="{ clickable: true }"
      @click="onClick"
    >
      <SwiperSlide v-for="item of banners" :key="item.targetId" @click="onClickItem(item)"
        ><img :src="item.imageUrl" laading="lazy" />
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        <div class="tag" :style="{ backgroundColor: item.titleColor }">{{ item.typeTitle }}</div>
      </SwiperSlide>
      <template #container-start><div class="prevEl">&lt;</div></template>
      <template #container-end> <div class="nextEl">&gt;</div></template>
      <!-- <template v-slot:wrapper-start><span>Wrapper start</span></template> -->
      <!-- <template v-slot:wrapper-end></template> -->
    </swiper>
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
import { getbanner, getrecommendDaySongs } from '@renderer/api'
import { onMounted, ref, reactive } from 'vue'
import { useRecommendStore } from '@renderer/store/recommend'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper/types'
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectCoverflow,
  Virtual
} from 'swiper/types/modules/index'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'
import 'swiper/css/virtual'
// Import Swiper styles
import 'swiper/css'

import recommendCover from '@renderer/components/MusicCover/recommendCover.vue'

const swipers = useSwiper()
const swiperslides = useSwiperSlide()
console.log(swipers)
console.log(swiperslides)
const recommendStore = useRecommendStore()
const { simpleRecommendList } = storeToRefs(recommendStore)
const modules = [Navigation, Pagination, A11y, Autoplay, EffectCoverflow, Virtual]
const banners = ref<Array<any>>([])
const recommendMsg = reactive({
  title: '推荐歌单',
  pathName: '/',
  detailList: []
})
const getBannerMsg = async () => {
  try {
    const res: any = await getbanner()
    banners.value = res.banners
    console.log(banners.value, 111111111)
  } catch (err) {
    console.log(err)
  }
}
const getrecommendDaySongsMsg = async () => {
  try {
    const res: any = await getrecommendDaySongs()
    console.log(res, 1111111111)
  } catch (err) {
    console.log(err)
  }
}
//点击轮播图
const onClick = (swiper: SwiperType, e: any) => {
  const activeIndex = swiper.activeIndex
  const clickIndex = swiper.clickedIndex
  if (activeIndex === clickIndex) {
    console.log('跳转')
    console.log(swiper, e)
  } else if (
    activeIndex > clickIndex ||
    (clickIndex === banners.value.length - 1 && activeIndex === 0)
  ) {
    console.log('往前')
    swiper.slidePrev()
  } else {
    console.log('往后')
    swiper.slideNext()
  }
}
const onClickItem = (item: any) => {
  console.log(item.targetType)
}
onMounted(() => {
  getBannerMsg()
  getrecommendDaySongsMsg()
  recommendStore.getRecommendList(10)
})
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .swiper {
    position: relative;
    width: 100%;
    :deep(.swiper-pagination-bullet) {
      background-color: #e5e5e5;
    }
    :deep(.swiper-pagination-bullet-active) {
      background-color: #ff6666;
    }
    .swiper-slide {
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      .tag {
        width: 80px;
        height: 20px;
        position: absolute;
        text-align: center;
        line-height: 20px;
        color: #fff;
        bottom: 0;
        right: 0;
        border-radius: 5px;
        border: 1px solid red;
      }
      & > img {
        width: 100%;
        border-radius: 10px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .prevEl,
  .nextEl {
    user-select: none;
    -webkit-user-select: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    background-color: antiquewhite;
  }
  .prevEl {
    position: absolute;
    top: 50%;
    z-index: 10;
    left: 10px;
    transform: translateY(-50%);
  }
  .nextEl {
    position: absolute;
    z-index: 10;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
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
