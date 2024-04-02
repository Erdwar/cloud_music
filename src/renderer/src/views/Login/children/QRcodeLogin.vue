<template>
  <div class="title">扫码登陆</div>
  <div class="QRcode">
    <el-skeleton style="width: 240px" :loading="!qrimg" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 150px; height: 150px" />
      </template>
      <template #default>
        <img :src="qrimg" alt="" loading="lazy" />
      </template>
    </el-skeleton>

    <div v-if="qrstatus !== 801 && qrstatus !== 803" class="status">
      <div class="statusLabel">
        <el-icon v-show="qrstatus === 800" color="red"><i-ep-circle-close /></el-icon>
        <el-icon v-show="qrstatus === 802" class="is-loading"><i-ep-loading /></el-icon>
        <el-button v-show="qrstatus === 800" class="regain" @click="store.getQr"
          >重新获取</el-button
        >
        <div v-show="qrstatus === 802">确认中...</div>
      </div>
    </div>
  </div>
  <div class="tips">使用<a :href="qrurl" @click="toWebLogin">网易云音乐APP</a>扫码登录</div>
  <div class="other" @click="toPhoneLogin">选择其他登陆方式登录></div>
</template>
<script setup lang="ts">
import { useUserStore } from '@renderer/store/user'
const store = useUserStore()
const router = useRouter()
const { qrimg, qrstatus, qrurl } = storeToRefs(store)
let timer: string | number | NodeJS.Timeout | undefined
watch(qrstatus, () => {
  if (qrstatus.value === 803) {
    ElMessage.success('登录成功')
    // window.ipcRenderer.send('closeLogin')
  }
})
//前往web页面登陆
const toWebLogin = (e: Event) => {
  e.preventDefault()
  window.ipcRenderer.send('toWebLogin', qrurl.value)
}
//前往手机登录
const toPhoneLogin = () => {
  router.push({ name: 'PhoneLogin' })
}
onMounted(() => {
  store.getQr()
  //检查二维码状态
  timer = setInterval(() => {
    store.checkQrState()
  }, 300)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<style lang="less" scoped>
.loading {
  color: black;
}
.title {
  font-size: 3rem;
  text-align: center;
  margin: 20px 0;
}
.QRcode {
  position: relative;
  width: 150px;
  height: 150px;
  > img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: fill;
  }
  .status {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    .statusLabel {
      height: 20px;
      width: 80%;
      display: flex;
      background-color: rgba(0, 0, 0, 0.4);
      justify-content: space-evenly;
      align-items: center;
      font-size: 1.2rem;
      .icon {
        width: 20px;
        height: 20px;
      }
      .regain {
        border: none;
        border-radius: 0;
        color: red;
        height: 20px;
        background-color: transparent;
        line-height: 20px;
      }
    }
  }
}
.tips {
  font-size: 1.6rem;
  text-align: center;
  margin: 10px 0;
  a {
    -webkit-app-region: no-drag;
  }
}
.other {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

:deep(.el-loading-spinner .path) {
  stroke: black;
}
:deep(.el-loading-spinner .el-loading-text) {
  color: black;
}
</style>
