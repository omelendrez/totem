<template>
  <div class="products">

    <md-layout id="container">

      <md-layout md-flex-large="33" v-for="product in products" :key="product.id" :md-item="product">
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

html {
  overflow: auto;
}

body {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
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