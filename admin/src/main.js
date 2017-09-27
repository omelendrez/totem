
import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App';
import router from './router';

Vue.use(VueMaterial);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
