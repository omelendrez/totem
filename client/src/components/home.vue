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
  </div>
</template>

<script>

import Categories from './categories'
import Products from './products'
import Basket from './basket'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    Categories,
    Products,
    Basket
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
</style>
