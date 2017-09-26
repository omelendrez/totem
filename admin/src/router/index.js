import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import Hello from '@/components/Hello';
import Test from '@/components/Test';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
  ],
});
