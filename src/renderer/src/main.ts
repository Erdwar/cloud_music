import { createApp } from 'vue'
import App from './App.vue'
import { Button, message, Input, Avatar, Dropdown, Menu } from 'ant-design-vue'
// import './assets/css/styles.less'
const app = createApp(App)
app.use(Button)
app.use(Input)
app.use(Avatar)
app.use(Dropdown)
app.use(Menu)

app.config.globalProperties.$message = message

app.mount('#app')
