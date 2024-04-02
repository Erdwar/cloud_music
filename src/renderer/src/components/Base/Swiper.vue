<template>
  <swiper
    :modules="modules"
    :slides-per-view="1.5"
    :space-between="20"
    :observer="true"
    :observe-parents="true"
    effect="coverflow"
    :centered-slides="true"
    loop
    autoplay
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
    <template #container-start
      ><div class="prevEl"><div class="iconfont icon-left"></div></div
    ></template>
    <template #container-end>
      <div class="nextEl"><div class="iconfont icon-right"></div></div
    ></template>
    <!-- <template v-slot:wrapper-start><span>Wrapper start</span></template> -->
    <!-- <template v-slot:wrapper-end></template> -->
  </swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y, Autoplay, EffectCoverflow, Virtual } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'
import 'swiper/css/virtual'
import 'swiper/css/autoplay'
// Import Swiper styles
import 'swiper/css'
const props = defineProps({
  banners: {
    type: Array<any>,
    default: () => []
  }
})
const modules = [Navigation, Pagination, A11y, Autoplay, EffectCoverflow, Virtual]
const onClick = (swiper: SwiperType, e: any) => {
  const activeIndex = swiper.activeIndex
  const clickIndex = swiper.clickedIndex
  if (activeIndex === clickIndex) {
    console.log('跳转')
    console.log(swiper, e)
  } else if (
    activeIndex > clickIndex ||
    (clickIndex === props.banners.length - 1 && activeIndex === 0)
  ) {
    console.log('往前')
    swiper.slidePrev()
  } else {
    console.log('往后')
    swiper.slideNext()
  }
}
const onClickItem = (item: any) => {
  switch (item.targetType) {
    case 1:
      console.log('新歌')
      break
    case 10:
      console.log('歌单')
      break
    default:
      break
  }
}
</script>
<style lang="less" scoped>
.swiper {
  position: relative;
  width: 100%;
  :deep(.swiper-pagination-bullet) {
    background-color: #e5e5e5;
  }
  :deep(.swiper-pagination-bullet-active) {
    background-color: #ff6666;
  }
  &:hover .prevEl {
    left: 10px;
  }
  &:hover .nextEl {
    right: 10px;
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
  .prevEl,
  .nextEl {
    user-select: none;
    -webkit-user-select: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #ebebeb;
    opacity: 0.8;
    transition: all 0.2s linear;
  }
  .prevEl {
    position: absolute;
    top: 50%;
    z-index: 10;
    left: -30px;
    transform: translateY(-50%);
  }
  .nextEl {
    position: absolute;
    z-index: 10;
    top: 50%;
    right: -30px;
    transform: translateY(-50%);
  }
}
</style>
