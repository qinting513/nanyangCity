import Vue from 'vue'
import App from './App'

import store from './store/index.js';
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
