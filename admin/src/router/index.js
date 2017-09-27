import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import Home from '@/components/home';
import Categorias from '@/components/categorias';
import Productos from '@/components/productos';

Vue.use(Router);
Vue.use(Resource);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: Categorias,
    },
    {
      path: '/productos',
      name: 'Productos',
      component: Productos,
    },
  ],
});
