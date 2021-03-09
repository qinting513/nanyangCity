import Vue from 'vue'
import App from './App'

import store from './store/index.js';
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

import nodataView from './components/nodata_view.vue'
Vue.component('nodata-view',nodataView)

const app = new Vue({
    ...App
})
app.$mount()
