import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Chart from 'chart.js';

const vueapp = createApp(App);
// vueapp.use(Chart);
vueapp.use(VueAxios,axios);
vueapp.use(router);
vueapp.mount('#app');
