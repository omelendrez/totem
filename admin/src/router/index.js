import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/login";
import Home from "@/components/home";
import Reports from "@/components/reports";

import Categories from "@/components/categories";
import CategoryAdd from "@/components/categoryAdd";
import CategoryEdit from "@/components/categoryEdit";
import CategoryView from "@/components/categoryView";

import Products from "@/components/products";
import ProductAdd from "@/components/productAdd";
import ProductEdit from "@/components/productEdit";
import ProductView from "@/components/productView";

import Discounts from "@/components/discounts";
import DiscountAdd from "@/components/discountAdd";
import DiscountEdit from "@/components/discountEdit";
import DiscountView from "@/components/discountView";

import Users from "@/components/users";
import UserAdd from "@/components/userAdd";
import UserEdit from "@/components/userEdit";
import UserView from "@/components/userView";

import Totem from "@/components/totem";
import Orders from "@/components/orders";
import Errors from "@/components/errors";
import CCPayments from "@/components/cc-payments";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/reports",
      name: "Reports",
      component: Reports
    },
    {
      path: "/errors",
      name: "Errors",
      component: Errors
    },
    {
      path: "/orders",
      name: "Orders",
      component: Orders
    },
    {
      path: "/cc-payments",
      name: "CCPayments",
      component: CCPayments
    },
    {
      path: "/categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/categoryAdd",
      name: "CategoryAdd",
      component: CategoryAdd
    },
    {
      path: "/categoryEdit/:id",
      name: "CategoryEdit",
      component: CategoryEdit
    },
    {
      path: "/categoryView/:id",
      name: "CategoryView",
      component: CategoryView
    },
    {
      path: "/products",
      name: "Products",
      component: Products
    },
    {
      path: "/productAdd",
      name: "ProductAdd",
      component: ProductAdd
    },
    {
      path: "/productEdit/:id",
      name: "ProductEdit",
      component: ProductEdit
    },
    {
      path: "/productView/:id",
      name: "ProductView",
      component: ProductView
    },
    {
      path: "/discounts",
      name: "Discounts",
      component: Discounts
    },
    {
      path: "/discountAdd",
      name: "DiscountAdd",
      component: DiscountAdd
    },
    {
      path: "/discountEdit/:id",
      name: "DiscountEdit",
      component: DiscountEdit
    },
    {
      path: "/discountView/:id",
      name: "DiscountView",
      component: DiscountView
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/userAdd",
      name: "UserAdd",
      component: UserAdd
    },
    {
      path: "/userEdit/:id",
      name: "UserEdit",
      component: UserEdit
    },
    {
      path: "/userView/:id",
      name: "UserView",
      component: UserView
    },
    {
      path: "/totem",
      name: "Totem",
      component: Totem
    }
  ]
});
