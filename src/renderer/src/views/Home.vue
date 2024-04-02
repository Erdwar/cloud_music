<template>
  <div class="content">
    <HeadBar ref="head" />
    <div class="detail-content">
      <SideBar />
      <div class="main">
        <Suspense><router-view></router-view></Suspense>
      </div>
    </div>
    <FloorBar />
  </div>
</template>
<script setup lang="ts">
import FloorBar from '@comp/Base/FlootBar.vue'
import HeadBar from '@comp/Base/HeadBar.vue'
import SideBar from '@comp/Base/SideBar.vue'

// import { useUserStore } from '@renderer/store/user'
// import { getCookie } from '@renderer/utils/cookie'
// const userStore = useUserStore()
onMounted(() => {
  // windowDrag()
  // if (!getCookie()) {
  //   userStore.touristLogin()
  // }
})
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.detail-content {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  display: grid;
  gap: 0;
  grid-template-columns: 200px 1fr;
  border: 1px solid blue;

  overflow: hidden;

  // &::-webkit-scrollbar-track {
  //   background-color: #f5f5f5;
  // }
  .main {
    padding: 0 40px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
      border-radius: 5px;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
}
</style>
