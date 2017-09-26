
import Vue from 'vue';
import App from './App';
import router from './router';

const VueMaterial = require('vue-material');

Vue.config.productionTip = false;
Vue.use(VueMaterial);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
