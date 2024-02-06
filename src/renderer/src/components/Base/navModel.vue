<template>
  <div class="navModel">
    <div v-if="title.name" class="navModel-top">
      <div v-if="title">{{ title.name }}</div>
      <div
        v-if="title.isRight"
        class="iconfont ispoint"
        :class="isClose ? 'icon-youjiantou' : 'icon-xiangxia'"
        @click="isClose = !isClose"
      ></div>
      <div v-if="title.isAdd" class="iconfont icon-jiahao ispoint"></div>
    </div>
    <div v-show="!isClose" class="navModel-content">
      <div
        v-for="item in navlist"
        :key="item.id"
        class="nav-item"
        :class="selectId === item.id ? 'active' : ''"
        @click="goTo(item.pathname, item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
interface navListType {
  id: string
  icon?: string
  name: string
  pathname: string
}
interface navTitleType {
  name: string
  isRight?: boolean
  isAdd?: boolean
  isClose?: boolean
}
const router = useRouter()
const props = defineProps({
  title: {
    type: Object as () => navTitleType,
    default: () => ({ name: '' })
  },
  navlist: {
    type: Array<navListType>,
    default: () => []
  },
  selectId: {
    type: String,
    default: 'n1'
  }
})
const emit = defineEmits(['update:selectId'])
const isClose = ref(props.title.isClose)
const goTo = (pathname: string, id: string) => {
  emit('update:selectId', id)
  router.push(pathname)
}
</script>
<style lang="less" scoped>
.navModel {
  width: 100%;
  margin-bottom: 10px;
  .navModel-top {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    color: #999999;
    padding-left: 2px;
    margin: 10px 0;
    & > div {
      font-size: 1.2rem;
      margin: 0 5px;
      &:nth-child(3) {
        margin-left: 80px;
      }
    }
    .ispoint {
      cursor: pointer;
    }
  }
  .navModel-content {
    width: 100%;
    .nav-item {
      width: 100%;
      height: 30px;
      // font-size: 1.4rem;
      line-height: 30px;
      padding-left: 5px;
      font-size: 1.4rem;
      margin: 3px 0;
      cursor: pointer;
      &:hover {
        background-color: #f6f6f7;
      }
    }
    .active {
      background-color: #f6f6f7;
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
}
</style>
