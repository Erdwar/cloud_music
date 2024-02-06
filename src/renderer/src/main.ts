import { createApp } from 'vue'
import App from './App.vue'
import { Button, message, Input, Avatar, Dropdown, Menu } from 'ant-design-vue'
import router from './router'
import './assets/css/styles.less'
// import { register } from 'swiper/element/bundle'
import { createPinia } from 'pinia'
import mitt from 'mitt'
import type { InjectionKey } from 'vue'
import { VClickOutside } from '@renderer/utils/directives'
const Mit = mitt()
const global = Symbol() as InjectionKey<{ Mit: typeof Mit }>
// register()
const pinia = createPinia()
// register()
const app = createApp(App)
app.use(Button)
app.use(Input)
app.use(Avatar)
app.use(Dropdown)
app.use(Menu)
app.use(pinia)
app.config.globalProperties.$message = message
app.provide(global, { Mit })
app.directive('click-outside', VClickOutside)
app.use(router)
app.mount('#app')
