<template>
  <div class="products">

    <md-layout id="container">

      <md-layout v-on:click.native="addBasket(product)" md-flex-large="33" v-for="product in products" :key="product.id" :md-item="product">
        <div class="product">
          <md-image :md-src="product.image"></md-image>
          <div class="text">
            {{product.name}}
          </div>
        </div>
      </md-layout>

    </md-layout>

  </div>
</template>

<script>

import Store from '../store/store';
import { fetchProducts } from '../store/getters';

export default {
  store: Store,
  computed: {
    products() {
      return Store.state.products;
    }
  },
  created() {
    Store.dispatch('LOAD_PRODUCTS');
  },
  methods: {
    addBasket(item) {
      Store.dispatch('ADD_ITEM', item);
    }
  }
}

</script>

<style scoped>
.products {
  overflow: auto;
  width: 100%;
}

.product {
  text-align: center;
}

#container>.md-layout {
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.md-card-header {
  text-align: center;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>