<template>
  <div class="content">
    <div class="iconfont icon-guanbi close" @click="closeWindow"></div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
const closeWindow = () => {
  console.log(window.ipcRenderer)
  window.ipcRenderer.send('closeLogin')
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
}
</style>
