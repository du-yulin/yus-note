import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
// el-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义全局css
import './assets/css/reset.css'
import './assets/css/main.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
