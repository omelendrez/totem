<template>
  <div class="products">
    <md-layout id="container">
      <md-layout md-align="center" v-on:click.native="openItem(product)" md-flex-large="33" v-for="product in products" :key="product.id" :md-item="product">
        <div class="product">
          <md-image :md-src="product.image"></md-image>
          <div class="md-title">
            {{product.name}}
          </div>
          <div class="md-subhead">
            {{product.price}}
          </div>
        </div>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import store from '@/store'
import { types } from "@/store/mutation-types";

export default {
  store,
  data() {
    return {

    }
  },
  computed: {
    products() {
      return store.getters.products;
    },
    itemSet() {
      return store.getters.itemSet;
    }
  },
  created() {
    store.dispatch(types.LOAD_PRODUCTS);
  },
  methods: {
    openItem(item) {
      item.from = "products";
      store.dispatch(types.SET_ITEM, item);
    }
  }
};
</script>

<style scoped>
.products {
  overflow: auto;
  width: 100%;
  left: 0;
}

.product {
  text-align: center;
  margin-bottom: 40px;
}

.md-title,
.md-subhead {
  font-size: small;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
