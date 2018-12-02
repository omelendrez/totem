import Vue from "vue";
import Router from "vue-router";
import routesList from "./routes";

const routes = routesList.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  routes,
  mode: "history"
});
