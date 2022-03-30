import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

import { sum } from '../src';

console.log(sum(1, 2));

createApp(App).mount('#app');
