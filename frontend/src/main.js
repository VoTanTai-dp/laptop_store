import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
const queryClient = new QueryClient();

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
