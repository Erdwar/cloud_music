<template>
  <div class="title" @click="router.push({ name: pathName })">{{ title }} ></div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  title: {
    type: String,
    default: ''
  },
  pathName: {
    type: String,
    default: ''
  }
})
</script>
<style lang="less" scoped>
.title {
  font-size: 2rem;
  padding: 5px 0;
}
</style>
