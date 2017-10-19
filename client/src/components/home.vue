<template>
  <div class="home">
    <md-toolbar>
      <h1 class="md-title">Big Six</h1>
    </md-toolbar>
    <div class="main" v-if="splash" @click="start()">
      <md-image :md-src="src"></md-image>
      <md-button class="md-raised md-default hide-splash">
        toque la pantalla para comenzar
      </md-button>
    </div>
    <div class="categories" v-if="!splash">
      <Categories />
    </div>
    <div class="products"  v-if="!splash">
      <Products />
    </div>
    <div class="basket"  v-if="!splash">
      <Basket />
    </div>
    <div class="details">
      <Detail />
    </div>
    <div class="overlay" v-if="itemSet"></div>
  </div>
</template>

<script>
import Categories from "./categories";
import Products from "./products";
import Basket from "./basket";
import Detail from "./details";

import Store from "../store/store";

export default {
  store: Store,
  name: "home",

  computed: {
    itemSet() {
      return Store.state.itemSet;
    }
  },
  data() {
    return {
      splash: true,
      src: '/static/img/bigsix.jpg'
    };
  },
  methods: {
    start() {
      this.splash = false;
    }
  },
  components: {
    Categories,
    Products,
    Basket,
    Detail
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.categories {
  position: absolute;
  top: 32px;
  left: 0;
  height: 90%;
  width: 20%;
}

.products {
  position: absolute;
  top: 32px;
  right: 0;
  height: 90%;
  width: 80%;
}

.basket {
  position: absolute;
  padding: 0;
  margin: 0;
  bottom: 0;
  height: 10%;
  width: 100%;
  background-color: #fff;
}

.details {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 20%;
  left: 0;
  right: 0;
  z-index: 99998;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: cadetblue;
  z-index: 99999;
  overflow: hidden;
}

.main img {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.2);
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
.hide-splash {
  margin: 0;
  top: 30%;
  position: absolute;
  font-size: 24px;
  padding: 20px;
  width: 100%;
}

</style>
