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
  data() {
    return {
      logged: false,
      last_call: '',
      user_id: 0,
      api_url: 'http://192.168.0.7:3000/'
    };
  },
  render: h => h(App)
});
