<template>
  <div class="home">
    <div class="categories">
      <Categories />
    </div>
    <div class="products">
      <Products />
    </div>
    <div class="basket">
      <Basket />
    </div>
    <div class="details">
      <Details />
    </div>
    <div class="overlay" v-if="itemSet"></div>
  </div>
</template>

<script>

import Categories from './categories'
import Products from './products'
import Basket from './basket'
import Details from './details'

import Store from '../store/store';

export default {
  store: Store,
  name: 'home',
  computed: {
    itemSet() {
      return Store.state.itemSet;
    }
  },
  data() {
    return {

    }
  },
  components: {
    Categories,
    Products,
    Basket,
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categories {
  position: absolute;
  top: 0;
  left: 0;
  height: 90%;
  width: 20%;
}

.products {
  position: absolute;
  top: 0;
  right: 0;
  height: 90%;
  width: 80%;
}

.basket {
  position: absolute;
  padding: 0;
  margin: 0;
  bottom: 6px;
  height: 10%;
  width: 100%;
}

.details {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  z-index: 99998;
}

.overlay {
  background: rgba(0, 0, 0, .2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  z-index: 99997;
}
</style>
