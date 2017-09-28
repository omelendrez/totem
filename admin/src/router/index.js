import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import Home from '@/components/home';

import Categories from '@/components/categories';
import CategoryAdd from '@/components/categoryAdd';
import CategoryEdit from '@/components/categoryEdit';

import Products from '@/components/products';
import ProductAdd from '@/components/productAdd';
import ProductEdit from '@/components/productEdit';

import Discounts from '@/components/discounts';
import DiscountAdd from '@/components/discountAdd';
import DiscountEdit from '@/components/discountEdit';

Vue.use(Router);
Vue.use(Resource);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/categoryAdd',
      name: 'CategoryAdd',
      component: CategoryAdd
    },
    {
      path: '/categoryEdit/:id',
      name: 'CategoryEdit',
      component: CategoryEdit
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/productAdd',
      name: 'ProductAdd',
      component: ProductAdd
    },
    {
      path: '/productEdit/:id',
      name: 'ProductEdit',
      component: ProductEdit
    },
    {
      path: '/discounts',
      name: 'Discounts',
      component: Discounts
    },
    {
      path: '/discountAdd',
      name: 'DiscountAdd',
      component: DiscountAdd
    },
    {
      path: '/discountEdit/:id',
      name: 'DiscountEdit',
      component: DiscountEdit
    }
  ]
});
