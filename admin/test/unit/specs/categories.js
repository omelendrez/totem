import Vue from 'vue';
import categories from '@/components/categories';

describe('categories.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(categories);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1.md-title').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
