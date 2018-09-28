// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import './assets/scss/index.scss' // Customize UI
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { store } from './store'
import { routers } from './helpers'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import App from './app/App'
import Vuelidate from 'vuelidate'
Vue.config.productionTip = false

// setup fake backend
// import { configureFakeBackend } from './helpers';
// configureFakeBackend();

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate);

Vue.router = routers
Vue.use(VueAuth, {
   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

new Vue({
  el: '#app',
  router:routers,
  store,
  render: h => h(App)
})
