// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
import router from './router'
import store from './store'
import init from '@/store/init.js'



const app = createApp(App)
    .use(router)
    .use(store)
    .use(init)

registerPlugins(app)

app.mount('#app')
