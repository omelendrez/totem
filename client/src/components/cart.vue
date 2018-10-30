<template>
  <div class="cart">
    <h1>Carrito</h1>
    <md-chip v-if="totalBasket" class="md-accent cart-total">
      $ {{totalBasket}}
      <md-icon class="cart-icon pull-right">shopping_cart</md-icon>
      Pagar
    </md-chip>
    <h4 v-else>No tenés items en tu carrito</h4>

    <md-list class="md-triple-line">
      <md-list-item v-for="(basketItem, index) in basketItems" :key="index">
        <md-avatar>
          <md-image :md-src="basketItem.image"></md-image>
        </md-avatar>
        <div class="md-list-text-container">
          <span><strong>{{basketItem.name}}</strong></span>
          <span>{{basketItem.category.name}}</span>
          <p><span class="price">${{basketItem.price}}</span></p>
        </div>
        <md-button class="md-icon-button md-raised md-accent" v-on:click.native="eliminar(basketItem)">
          <md-icon>clear</md-icon>
        </md-button>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>

  </div>
</template>

<script>
import store from "@/store";
import { types } from "@/store/mutation-types";

export default {
  store,
  computed: {
    basketItems() {
      return store.getters.basket;
    },
    totalBasket() {
      return store.getters.totalBasket;
    }
  },
  methods: {
    eliminar(item) {
      item.from = "basket";
      store.dispatch(types.SET_ITEM, item);
      store.dispatch(types.REMOVE_ITEM, item);
    },
    back() {
      // We will see what we will do
    },
    allowDrop(ev) {
      console.log("allowDrop");
      ev.preventDefault();
    },
    drag(ev) {
      console.log("drag");
      ev.dataTransfer.setData("text", ev.target.id);
    }
  }
};
</script>

<style scoped>
.cart {
  padding: 4px;
  overflow: auto;
  width: 100%;
  text-align: center;
  border-left: 1px solid lavender;
}
.md-icon-button i {
  color: #fff;
}
.md-image {
  height: auto;
}
::-webkit-scrollbar {
  width: 0px;
}

table thead tr td,
table tbody tr td {
  padding: 10px;
}
.cart-icon {
  color: #fff;
}
.cart-total {
  height: 64px;
  padding: 24px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
}

.md-list-text-container span {
  font-size: small;
}
.price {
  float: right;
  font-weight: bold;
}

</style>
