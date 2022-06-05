import { createApp } from 'vue'
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persist';

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

pinia.use(persist)
app.use(pinia);
app.use(router);
app.mount('#app');
