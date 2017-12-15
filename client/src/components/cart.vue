<template>
  <div class="cart">
    <md-list class="md-triple-line">

      <md-chip class="md-accent cart-total">
        $ {{totalBasket}}
        <md-icon class="cart-icon pull-right">shopping_cart</md-icon>
      </md-chip>

      <md-list-item draggable="true" v-for="basketItem in basketItems" :key="basketItem.id">
        <md-avatar>
          <md-image :md-src="basketItem.image"></md-image>
        </md-avatar>

        <div class="md-list-text-container">
          <span>{{basketItem.description}}</span>
          <span>{{basketItem.category.name}}</span>
          <p>${{basketItem.price}}</p>
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
import Store from "../store/store";

export default {
  store: Store,
  computed: {
    basketItems() {
      return Store.state.basket;
    },
    totalBasket() {
      return Store.state.totalBasket;
    }
  },
  methods: {
    eliminar(item) {
      item.from = "basket";
      Store.dispatch("SET_ITEM", item);
      Store.dispatch("REMOVE_ITEM", item);
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
  border-left: 1px solid lavender;
}
.md-icon-button i {
  color: #fff;
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
  height: 60px;
  padding: 24px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
}
</style>
