<template>
  <v-container class="home">
    <div class="categories">
      <Categories />
    </div>
    <div class="products">
      <Products />
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
export default {
  name: "home",
  store,
  components: {
    Categories,
    Products
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
  left: 0;
  width: 20%;
}
.products {
  left: 20%;
  position: absolute;
  width: 60%;
}
.basket {
  left: 80%;
  position: absolute;
  width: 20%;
}
</style>
