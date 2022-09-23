import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupPlugins } from "./plugins/vant.js";
import './assets/main.css'
import i18n from './locales/i18n.js';

const app = createApp(App).use(i18n)
// const app = createApp(App)
 
app.use(router)
app.use(setupPlugins)
app.mount('#app')
