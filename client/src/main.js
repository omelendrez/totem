import Vue from "vue";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import App from "./App";
import router from "./router";

Vue.use(Vuex);
Vue.use(VueMaterial);

require("./assets/css/vue-material.css");

Vue.config.productionTip = true;

import store from "./store/store";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data() {
    return {};
  },
  store: store,
  render: h => h(App)
});
