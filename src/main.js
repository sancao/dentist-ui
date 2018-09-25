// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import { store } from './store';
import { router } from './helpers'
import App from './app/App'

Vue.config.productionTip = false

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
