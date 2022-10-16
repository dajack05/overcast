import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './style.css'

import { globalCookiesConfig } from 'vue3-cookies'

const app = createApp(App)

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
})

app.use(createPinia())
app.use(router)

app.mount('#app')
