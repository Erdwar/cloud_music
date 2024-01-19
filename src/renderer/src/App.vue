<script setup lang="ts">
import FloorBar from '@comp/Base/FlootBar.vue'
import HeadBar from '@comp/Base/HeadBar.vue'
import SideBar from '@comp/Base/SideBar.vue'
</script>

<template>
  <div class="content">
    <HeadBar />
    <div class="detail-content">
      <SideBar />
      <div></div>
    </div>
    <FloorBar />
  </div>
</template>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.detail-content {
  flex: 1;
  width: 100%;
  display: grid;
  gap: 0;
  grid-template-columns: 200px 1fr;
  border: 1px solid blue;
}
</style>
