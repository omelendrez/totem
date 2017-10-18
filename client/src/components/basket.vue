<template>
  <div class="items">
    <md-chip v-if="totalBasket" class="md-accent">${{totalBasket}}</md-chip>
    <md-layout id="container">

      <md-layout v-on:click.native="openItem(basket)" md-flex-large="10" v-for="(basket, rowIndex) in basketItems " :key="rowIndex " :md-item="basket ">
        <div class="item ">
          <md-card-media>
            <md-image :md-src="basket.image "></md-image>
          </md-card-media>
        </div>
      </md-layout>

    </md-layout>
  </div>
</template>

<script>

import Store from '../store/store';

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
      item.from = 'basket';
      Store.dispatch('SET_ITEM', item);
    }
  }

}

</script>

<style scoped>
.item {
  margin: 10px;
}

.items {
  border-top: 10px solid cadetblue;
}

.md-chip {
  float: right;
  font-size: 16px;
  margin-top: 10px;
}
</style>