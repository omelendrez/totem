import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import Home from '@/components/home';
import Categorias from '@/components/categorias';
import Products from '@/components/productos';

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
      path: '/categorias',
      name: 'Categorias',
      component: Categorias
    },
    {
      path: '/productos',
      name: 'Productos',
      component: Products
    }
  ]
});
