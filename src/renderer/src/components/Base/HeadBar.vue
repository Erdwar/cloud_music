<template>
  <div class="head">
    <div class="head-left">
      <div class="iconfont icon-logo logo"></div>
      <div class="title">网易云音乐</div>
      <div class="iconfont icon-left circlebg useble"></div>
      <div class="iconfont icon-right circlebg useble"></div>
      <div class="search">
        <a-input v-model="search" placeholder="Basic usage">
          <template #prefix>
            <!-- <div class="iconfont icon-sousuo search-icon"></div> -->
            <SearchOutlined class="search-icon" />
          </template>
        </a-input>
      </div>

      <div class="iconfont icon-yuyin circlebg"></div>
    </div>
    <div class="head-right">
      <a-avatar :size="30">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <a-dropdown class="user-dropdown" :trigger="['click']">
        <div class="dropdown-btn">未登录<CaretDownOutlined /></div>
        <template #overlay>
          <a-menu v-if="loginState">
            <a-menu-item v-for="item in dropdownData" :key="item.key">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <div class="user-vip">vip开通 <RightOutlined /></div>
      <div class="iconfont icon-zhuti icon"></div>
      <div class="iconfont icon-shezhi icon"></div>
      <div class="iconfont icon-youjian icon"></div>
      <div class="cutline">|</div>
      <div class="iconfont icon-minimoshi icon"></div>
      <div class="iconfont icon-zuixiaohua icon" @click="MinScreen()"></div>
      <div
        :class="isMaxScreen ? 'icon-rescreen' : 'icon-zuidahua'"
        class="iconfont icon"
        @click="MaxScreen()"
      ></div>
      <div class="iconfont icon-guanbi icon" @click="closeScreen()"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  SearchOutlined,
  UserOutlined,
  RightOutlined,
  CaretDownOutlined
} from '@ant-design/icons-vue'
const search = ref('')
const loginState = ref(false)
const isMaxScreen = ref(false)
const dropdownData = [
  {
    key: '1',
    label: '1st menu item'
  },
  {
    key: '2',
    label: '2nd menu item'
  },
  {
    key: '3',
    label: '3rd item'
  }
]
//窗口最大化
const MaxScreen = () => {
  window.ipcRenderer.send('MaxScreen')
  // isMaxScreen.value = !isMaxScreen.value
}
//窗口最小化
const MinScreen = () => {
  window.ipcRenderer.send('MinScreen')
}
//窗口关闭
const closeScreen = () => {
  window.ipcRenderer.send('CloseScreen')
}

onMounted(() => {
  window.onresize = () => {
    window.ipcRenderer.send('ScreenResize')
  }
  // 监听是否最大化
  window.ipcRenderer.on('isMaxScreen', (_, data) => {
    isMaxScreen.value = data
  })
})
</script>

<style lang="less" scoped>
.head {
  user-select: none;
  box-sizing: border-box;
  height: 30 + 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  -webkit-app-region: drag;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      margin: 3px;
      -webkit-app-region: no-drag;
    }
  }
  .head-left {
    .logo {
      font-size: 28px;
      color: red;
    }
    .title {
      font-size: 18px;
      margin-right: 50px;
    }
    .circlebg {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #ebebeb;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.useble {
        color: #b1b1b1;
      }
    }
    .search {
      width: 150px;
      height: 30px;
      .search-icon {
        margin-left: 10px;
      }
      :deep(.ant-input-affix-wrapper) {
        background-color: #ebebeb;
        &:hover {
          border-color: red;
        }
        &:focus {
          border-color: red;
          // .ant-input:placeholder-shown {
          //   background-color: aqua;
          // }
        }
      }
      :deep(.ant-input-affix-wrapper .ant-input) {
        background-color: transparent;
        &:placeholder-shown {
          font-size: 0.8rem;
        }
      }
    }
  }
  .head-right {
    .user-dropdown {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .dropdown-btn {
      font-size: 0.8rem;
      line-height: 20px;
    }
    .user-vip {
      font-size: 0.4rem;
      color: #fff;
      padding: 2px 3px;
      border-radius: 5px;
      background-color: #cccccc;
    }
    .cutline {
      font-weight: 200;
    }
    .icon {
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>
