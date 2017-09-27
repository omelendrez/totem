import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import Home from '@/components/home';
import Categories from '@/components/categories';
import Products from '@/components/products';
import ProductAdd from '@/components/productAdd';
import ProductEdit from '@/components/productEdit';

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
    }
  ]
});
