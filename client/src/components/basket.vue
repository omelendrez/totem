<template>
  <div class="basket-items">

    <md-chip v-if="totalBasket" class="md-accent basket-checkout" v-on:click.native="checkout()">
      CHECKOUT
      <md-icon>attach_money</md-icon>
      {{totalBasket}}
    </md-chip>

    <md-layout id="container">

      <md-layout v-on:click.native="openItem(basket)" md-flex-large="10" v-for="(basket, rowIndex) in basketItems" :key="rowIndex" :md-item="basket">
        <div class="basket-item">
          <md-image :md-src="basket.image"></md-image>
          {{basket.name}}
        </div>
      </md-layout>

    </md-layout>

  </div>
</template>

<script>
import store from "@/store";

export default {
  store,
  computed: {
    basketItems() {
      return store.getters.basket;
    },
    itemSet() {
      return store.getters.itemSet;
    },
    totalBasket() {
      return store.getters.totalBasket;
    }
  },
  methods: {
    openItem(item) {
      item.from = "basket";
      store.dispatch("SET_ITEM", item);
    },
    checkout() {
      console.log("Checking out", store.state.totalBasket);
      this.$router.push({ name: "Cart" });
    }
  }
};
</script>

<style scoped>
.basket-item {
  text-align: center;
}

.basket-items {
  border-top: 10px solid cadetblue;
  height: 100%;
  overflow: hidden;
}

.basket-checkout {
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 1.2em;
  z-index: 99999;
}
</style>
