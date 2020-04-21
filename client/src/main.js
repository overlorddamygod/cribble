import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const socket = io(window.location.hostname==="localhost"? `http://localhost:5000` : `https://blooming-wave-16961.herokuapp.com/` );

Vue.use(VueSocketIOExt, socket);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
