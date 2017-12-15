import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Cart from "@/components/cart";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    }
  ]
});
