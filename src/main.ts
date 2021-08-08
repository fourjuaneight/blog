import { createApp } from 'vue';

import App from './App.vue';
import router from './router.ts';

import './styles/critical.css';
import './styles/main.css';
import './styles/tailwind.css';

const app = createApp(App);

app.use(router).mount('#app');
