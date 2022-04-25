import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css';
import './assets/reset.css'
// 路由守卫
import './permission'
const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(createPinia())
app.mount('#app')
