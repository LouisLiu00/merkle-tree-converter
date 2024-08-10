// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
import router from './router'



const app = createApp(App)
    .use(router)

registerPlugins(app)

app.mount('#app')
