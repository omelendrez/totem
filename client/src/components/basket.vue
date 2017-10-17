<template>
  <div class="items">

    <md-layout id="container">

      <md-layout v-on:click.native="removeBasket(basket)" md-flex-large="10" v-for="(basket, rowIndex) in basketItems " :key="rowIndex " :md-item="basket ">
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
    }
  },
  methods: {
    removeBasket(item) {
      Store.dispatch('REMOVE_ITEM', item);
    }
  }

}

</script>

<style scoped>
.item {
  margin-left: 16px;
  width: 60%;
  vertical-align: middle;
}

.items {
  border-top: 10px solid cadetblue;
  vertical-align: middle;
  height: 100%;
}

#container {
  vertical-align: middle;
  height: 100%;
}

.md-layout {
  vertical-align: middle;
  height: 100%;
}

img {
  vertical-align: middle;
}
</style>