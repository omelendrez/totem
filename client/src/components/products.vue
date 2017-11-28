<template>
  <div class="products">

    <md-layout id="container">

      <md-layout v-on:click.native="openItem(product)" md-flex-large="33" v-for="product in products" :key="product.id" :md-item="product">
        <div class="product">
          <md-image :md-src="product.image"></md-image>
          <div class="md-title">
            {{product.name}}
          </div>
          <div class="md-subhead">
            {{product.category.name}}
          </div>
        </div>
      </md-layout>

    </md-layout>

  </div>
</template>

<script>
import Store from "../store/store";

export default {
  store: Store,
  computed: {
    products() {
      return Store.state.products;
    },
    itemSet() {
      return Store.state.itemSet;
    }
  },
  created() {
    Store.dispatch("LOAD_PRODUCTS");
  },
  methods: {
    openItem(item) {
      item.from = "products";
      Store.dispatch("SET_ITEM", item);
    }
  }
};
</script>

<style scoped>
.products {
  overflow: auto;
  width: 100%;
}

.product {
  text-align: center;
  margin-bottom: 40px;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>