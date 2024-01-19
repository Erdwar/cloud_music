<template>
  <el-button>Default</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectID = ref(0)
const navList = [
  {
    id: 0,
    name: '发现音乐'
  }
]
</script>
<style lang="less" scoped></style>
