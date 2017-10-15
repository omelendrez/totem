<template>
  <div class="items">

    <md-layout id="container">

      <md-layout md-flex-large="10" v-for="basket in basketItems" :key="basket.id" :md-item="basket">
        <div class="item">
          <md-card-media>
            <md-image :md-src="basket.image"></md-image>
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
    created() {
    Store.dispatch('LOAD_BASKET');
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