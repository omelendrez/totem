<template>
  <div class="products">
    <h1>Productos</h1>
    <h3>{{selectedCategoryName}}</h3>
    <md-layout id="container">
      <md-layout md-align="center" md-flex-large="33" v-for="product in products" :key="product.id" :md-item="product">
        <div class="product">
          <md-image :md-src="product.image"></md-image>
          <div class="md-title">
            <strong>{{product.name}}</strong>
          </div>
          <div class="md-subhead">
            {{product.price}}
          </div>
          <md-button class="md-fab md-primary md-mini left" v-on:click.native="openItem(product)">
            <md-icon>help_outline</md-icon>
          </md-button>
          <md-button class="md-fab md-plain md-mini right" v-on:click.native="buyItem(product)">
            <md-icon>add</md-icon>
          </md-button>
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
    },
    selectedCategoryName() {
      return store.getters.selectedCategory ? store.getters.selectedCategory.name : 'TODAS LAS CATEGORÍAS';
    }
  },
  created() {
    store.dispatch(types.LOAD_PRODUCTS);
  },
  methods: {
    openItem(item) {
      item.from = "products";
      store.dispatch(types.SET_ITEM, item);
    },
    buyItem(item) {
      item.from = "products";
      store.dispatch(types.SET_ITEM, item);
      store.dispatch(types.ADD_ITEM, item);
    }

  }
};
</script>

<style scoped>
.products {
  overflow: auto;
  width: 100%;
  left: 0;
  text-align: center;
  padding: 0;
}

.product {
  text-align: center;
  height: 220px;
  min-width: 140px;
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
}

.md-title,
.md-subhead {
  font-size: small;
}

::-webkit-scrollbar {
  width: 0px;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
