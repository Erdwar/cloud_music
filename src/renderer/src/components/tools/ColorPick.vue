<template>
  <div class="content">
    <div class="nav"></div>
    <div class="base-color">
      <div
        v-for="item in baseColor"
        :key="item"
        class="base-color-item"
        :style="{ background: item }"
        @click="changeTheme(item)"
      ></div>
    </div>
    <div class="color-picker">
      <div class="color-show" :style="{ background: preClolor }"></div>
      <div class="color-picker-item">
        <div class="hue">
          <el-slider v-model="hue" size="small" :max="360" />
        </div>
        <div class="saturability">
          <el-slider v-model="saturability" size="small" :max="1" :step="0.01" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { useCssVar } from '@vueuse/core'
const hue = ref(0)
const saturability = ref(0)
const preClolor = ref('')
const baseColor = [
  '#ffffff',
  '#ff5c8a',
  '#ff7a9e',
  '#717ff9',
  '#4791eb',
  '#39afea',
  '#2bb669',
  '#6acc19',
  '#e2ab12',
  '#ff8f57',
  '#fd726d',
  '#fd544e'
]
const changeTheme = (themeColor: string) => {
  // const color = useCssVar('--size')
  // color.value = `${themeColor}px`
  //底层原理
  // document.documentElement.style.getPropertyValue('--size')
  console.log(themeColor)
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .nav {
    margin: 20px 0 10px 10px;
    font-size: 1.6rem;
    font-weight: 700;
    border-bottom: 2px solid black;
  }
  .base-color {
    // width: 264px;
    height: 80px;
    margin: 6px 18px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;
    .base-color-item {
      border-radius: 5px;
      border: 1px solid black;
    }
  }
  .color-picker {
    height: 50px;
    margin: 0 18px;
    display: flex;
    align-items: center;
    .color-show {
      width: 38px;
      height: 38px;
      border-radius: 5px;
      border: 1px solid black;
    }
    .color-picker-item {
      height: 50px;
      flex: 1;
      padding: 0 10px;
      :deep(.el-slider__button-wrapper) {
        transform: translateX(-14px) scale(0.6);
      }
      .hue,
      .saturability {
        width: 100%;
        height: 50%;
      }
      .hue {
      }
      .saturability {
      }
    }
  }
}
</style>
