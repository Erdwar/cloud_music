<template>
  <div class="head" @mousedown.self="winDown" @mousemove.self="winMove" @mouseup.self="winUp">
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
        <div class="dropdown-btn" @click="login">未登录<CaretDownOutlined /></div>
        <template #overlay>
          <a-menu v-if="loginState">
            <a-menu-item v-for="item in dropdownData" :key="item.key">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <div class="user-vip">vip开通 <RightOutlined /></div>
      <div class="iconfont icon-zhuti icon" @click.stop="setTheme"></div>
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
    <div
      v-show="isSetTheme"
      ref="ThemePicker"
      v-click-outside="cancelSetTheme"
      tabindex="-1"
      class="color-pick"
      @focus="console.log('123')"
    >
      <colorPick />
    </div>
  </div>
</template>
<script setup lang="ts">
import colorPick from '@renderer/components/tools/ColorPick.vue'
import {
  SearchOutlined,
  UserOutlined,
  RightOutlined,
  CaretDownOutlined
} from '@ant-design/icons-vue'
const search = ref('')
const isdrag = ref('')
const isSetTheme = ref(false)
const loginState = ref(false)
const isMaxScreen = ref(false)
const ThemePicker = ref()
const selectPickerFlag = ref(false)
const canMoving = ref(false)
//partial<> 定义为可选
const positionXY = ref<{ x: number; y: number }>({ x: 0, y: 0 })
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
const login = () => {
  window.ipcRenderer.send('login')
}
const setTheme = () => {
  isSetTheme.value = true
}
const winDown = () => {
  // canMoving.value = true
  // const XY = window.ipcRenderer.sendSync('win-start')
  // positionXY.value = JSON.parse(XY)
  // console.log(positionXY.value)
}
const winMove = () => {
  // if (isMaxScreen.value) return
  // if (!canMoving.value) return
  // console.log(e.screenX, e.screenY)
  isdrag.value = 'drag'
  // const params = {
  //   x: e.screenX - positionXY.value.x,
  //   y: e.screenY - positionXY.value.y,
  //   height: window.innerHeight,
  //   width: window.innerWidth
  // }
  // window.ipcRenderer.send('win-move', JSON.stringify(params))
}
const winUp = () => {
  // canMoving.value = false
  isdrag.value = 'no-drag'
}
const cancelSetTheme = () => {
  isSetTheme.value = false
  selectPickerFlag.value = true
}
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
  console.log(window.innerWidth, window.innerHeight,11111111111)
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
  position: relative;
  user-select: none;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  -webkit-app-region: v-bind(isdrag);
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
      font-size: 2.8rem;
      color: red;
    }
    .title {
      font-size: 1.8rem;
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
          font-size: 1.4rem;
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
      font-size: 1.4rem;
      line-height: 20px;
    }
    .user-vip {
      font-size: 0.8rem;
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
  .color-pick {
    position: absolute;
    right: 100px;
    top: 80%;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid red;
    z-index: 10;
  }
}
</style>
