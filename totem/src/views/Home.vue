<template>
  <v-container fluid class="home">
    <div class="categories">
      <Categories :categories="categories"/>
    </div>
    <div class="products">
      <Products :products="products" :add="add" :info="info" />
    </div>
    <div class="basket">
      <Basket :basket="basket" :remove="remove" />
    </div>
    <Product :add="add" />
  </v-container>
</template>

<script>
import store from "@/store";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Basket from "@/components/Basket";
import Product from "@/components/Product";
export default {
  name: "Home",
  store,
  components: {
    Categories,
    Products,
    Basket,
    Product
  },
  data() {
    return {};
  },
  computed: {
    categories() {
      return store.getters.categories;
    },
    products() {
      return store.getters.products;
    },
    basket() {
      return store.getters.basket;
    }
  },
  methods: {
    add(item) {
      store.dispatch("add", item);
    },
    info(item) {
      store.dispatch("info", item);
    },
    remove(item) {
      store.dispatch("remove", item);
    }
  },
  created() {
    store.dispatch("loadCategories");
    store.dispatch("loadProducts");
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
  width: 22%;
}

.home {
  background: cadetblue;
}
</style>
