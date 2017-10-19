<template>
  <div class="items">
    <md-chip v-if="totalBasket" class="md-accent" v-on:click.native="checkout()">
      CHECKOUT
      <md-icon>attach_money</md-icon>{{totalBasket}}</md-chip>
    <md-layout id="container">

      <md-layout v-on:click.native="openItem(basket)" md-flex-large="10" v-for="(basket, rowIndex) in basketItems " :key="rowIndex " :md-item="basket ">
        <div class="item ">
          <md-card-media>
            <md-image :md-src="basket.image"></md-image>
          </md-card-media>
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
    basketItems() {
      return Store.state.basket;
    },
    itemSet() {
      return Store.state.itemSet;
    },
    totalBasket() {
      return Store.state.totalBasket;
    }
  },
  methods: {
    openItem(item) {
      item.from = "basket";
      Store.dispatch("SET_ITEM", item);
    },
    checkout() {
      console.log("Checking out", Store.state.totalBasket);
    }
  }
};
</script>

<style scoped>
.item {
  margin-left: 10px;
}

.items {
  border-top: 10px solid cadetblue;
  height: 100%;
  overflow: hidden;
}

.md-chip {
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 1.2em;
}
</style>