<template>
  <v-container class="home">
    <div class="categories">
      <Categories />
    </div>
    <div class="products">
      <Products />
    </div>
    <div class="basket">
      <Basket />
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Basket from "@/components/Basket";
export default {
  name: "home",
  store,
  components: {
    Categories,
    Products,
    Basket
  },
  data() {
    return {};
  },
  created() {
    store.dispatch("loadBasket");
  }
};
</script>
<style scoped>
.categories {
  position: absolute;
  top: 32px;
  left: 0;
  bottom: 0;
  width: 15%;
}
.products {
  position: absolute;
  top: 32px;
  left: 9%;
  bottom: 0;
  width: 65%;
}

.basket {
  position: absolute;
  top: 32px;
  right: 0;
  bottom: 0;
  width: 20%;
}
</style>
