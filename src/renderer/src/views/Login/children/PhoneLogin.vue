<template>
  <div class="phone-content">
    <el-tooltip
      v-if="modelFlag !== 2"
      :visible="true"
      content="扫码登陆更安全"
      class="tooltip"
      placement="right-end"
    >
      <div class="iconfont icon-erweimadenglu returnQR" @click="retureQR"></div>
    </el-tooltip>
    <div v-else class="returePwd" @click="modelFlag = 0">&lt;返回密码登录</div>
    <div class="iconfont icon-netease-cloud logo"></div>
    <div class="form">
      <el-form :model="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="location">
                <template #prefix>
                  <el-icon :size="15" class="el-input__icon">
                    <i-ep-iphone />
                  </el-icon>
                </template>
                <el-option label="+86" value="+86" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-input v-model="formData.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="modelFlag === 0">
          <el-col>
            <el-form-item>
              <el-input v-model="formData.password" placeholder="请输入密码" :show-password="true">
                <template #prefix>
                  <el-icon :size="15" class="el-input__icon">
                    <i-ep-lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else-if="modelFlag === 1">
          <el-col :span="16">
            <el-form-item>
              <el-input v-model="formData.captcha" placeholder="请输入验证码" :show-password="true">
                <template #prefix>
                  <el-icon :size="15" class="el-input__icon">
                    <i-ep-key />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="getCaptcha" @click="VgetCaptcha">
              {{ verCodeFlag ? '获取验证码' : `${CountDown}s` }}
            </div>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col>
            <el-form-item>
              <el-input v-model="formData.password" placeholder="请设置密码" :show-password="true">
                <template #prefix>
                  <el-icon :size="15" class="el-input__icon">
                    <i-ep-lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-show="errTips" class="errTips">{{ errTips }}</div>
    <div class="otherOperations">
      <div>
        <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
      </div>
      <div v-show="modelFlag === 0" class="item">
        <div class="caozuo">忘记密码</div>
        <div class="split">|</div>
        <div class="caozuo" @click="modelFlag = 1">验证码登录</div>
      </div>
      <div v-show="modelFlag === 1" class="item">
        <div class="caozuo" @click="modelFlag = 0">密码登录</div>
      </div>
    </div>
    <div class="main-caozuo">
      <el-button v-show="modelFlag !== 2" @click="login">登录</el-button>
      <div v-show="modelFlag !== 2" class="register" @click="modelFlag = 2">注册</div>
      <el-button v-show="modelFlag === 2">注册</el-button>
    </div>
    <div v-show="modelFlag !== 2" class="third-login">
      <div class="iconfont icon-weixin" style="color: #02de6c"></div>
      <div class="iconfont icon-QQ" style="color: #1991ff"></div>
      <div class="iconfont icon-weibo" style="color: #ed462f"></div>
      <div class="iconfont icon-wangyi" style="color: #ed462f"></div>
    </div>
    <div class="clause">
      <el-checkbox v-model="autoLogin"
        >同意
        <a href="javascript:;">《服务条款》</a>
        <a href="javascript:;">《隐私政策》</a>
        <a href="javascript:;">《儿童隐私政策》</a>
      </el-checkbox>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@renderer/store/user'
import { getCaptcha, checkoutCaptcha } from '@api/user'
const router = useRouter()
const store = useUserStore()
interface formDataType {
  phone: string
  password?: string
  captcha?: string
}
const modelFlag = ref(0) //0 密码登录 1 验证码登录 2 注册
const location = ref('+86')
const autoLogin = ref(true)
const CountDown = ref(60)
const formData = ref<formDataType>({ phone: '' })
const timer = ref<NodeJS.Timeout>()
const verCodeFlag = ref(true)
const CaptchaColor = ref('#000')
const errTips = ref('')
const retureQR = () => {
  router.push({ name: 'QRcodeLogin' })
}
watch(modelFlag, () => {
  formData.value = {
    phone: '',
    password: '',
    captcha: ''
  }
  timer.value && clearInterval(timer.value)
  verCodeFlag.value = true
  CaptchaColor.value = '#000'
  errTips.value = ''
})
const formCheckout = (): boolean => {
  const regexp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!regexp.test(formData.value.phone)) {
    errTips.value = '请输入正确的手机号'
    return false
  } else {
    errTips.value = ''
    return true
  }
}
const VgetCaptcha = () => {
  try {
    if (!verCodeFlag.value) return
    if (!formCheckout()) return
    verCodeFlag.value = false
    CaptchaColor.value = '#606266'
    getCaptcha(formData.value.phone)
    timer.value = setInterval(() => {
      if (CountDown.value > 0) {
        CountDown.value--
      } else {
        CaptchaColor.value = '#000'
        verCodeFlag.value = true
        CountDown.value = 60
        clearInterval(timer.value)
      }
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}
const login = async () => {
  try {
    if (!formCheckout()) return
    if (modelFlag.value === 0) {
      if (!formData.value.password) {
        errTips.value = '请输入密码'
        return
      }
    } else if (modelFlag.value === 1) {
      if (!formData.value.captcha) {
        errTips.value = '请输入验证码'
        return
      }
      const res = await checkoutCaptcha({
        phone: formData.value.phone,
        captcha: formData.value.captcha
      })
      if (!res) {
        errTips.value = '验证码错误'
        return
      }
    }
    const state = await store.Alogin(formData.value)
    if (state) {
      console.log('登陆成功')
    } else {
      console.log('登陆失败')
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
<style lang="less" scoped>
.phone-content {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    -webkit-app-region: no-drag;
  }

  .returePwd {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  .returnQR {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 3.5rem;
    cursor: pointer;
    .tooltip {
      background-color: aqua;
    }
  }
  .logo {
    font-size: 6rem;
    margin: 5rem auto;
    color: #ff3a3a;
  }
  .form {
    width: 100%;
    :deep(.el-select__wrapper) {
      font-size: 1rem;
      border-radius: 0;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
      .el-input__wrapper {
        border-radius: 0;
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset !important;
        .el-input__inner {
          font-size: 1rem;
        }
      }
    }
    .getCaptcha {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: v-bind(CaptchaColor);
      border: 1px solid #dcdfe6;
    }
  }
  .errTips {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color: red;
  }
  .otherOperations {
    width: 100%;
    color: #4e8bc4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: flex;
      .caozuo {
        cursor: pointer;
      }
      .split {
        padding: 0 5px;
        margin-top: -1px;
      }
    }
  }
  .main-caozuo {
    width: 100%;
    margin-top: 20px;
    :deep(.el-button) {
      background-color: #ff3a3a;
      width: 100%;
      color: #fff;
      &:hover {
        background-color: #e53434;
      }
    }
    .register {
      width: 100%;
      text-align: center;
      padding: 8px 0;
      font-size: 1.3rem;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .third-login {
    width: 100%;
    display: flex;
    margin-top: 40px;
    justify-content: space-between;
    & > div {
      font-size: 3rem;
    }
  }
  .clause {
    width: 100%;
    margin-top: 20px;
    a {
      text-decoration: none;
      color: #4e8bc4;
    }
  }
  :deep(.el-checkbox) {
    .el-checkbox__label {
      font-size: 1rem;
      color: #606266 !important;
    }
    .el-checkbox__inner {
      background-color: #fff;
      transform: scale(0.8);
      border-color: #000;
      &::after {
        border-color: #ff3a3a;
      }
    }
  }
}
</style>
