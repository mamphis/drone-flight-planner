import { createApp } from 'vue'
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persist';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import App from './App.vue'
import router from './router'
import { translate } from './libs/localization/localizator';

const app = createApp(App);
const pinia = createPinia();

pinia.use(persist)
app.use(pinia);
app.use(router);
app.provide('$l', translate);
app.mount('#app');
