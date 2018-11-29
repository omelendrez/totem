<template>
  <v-container fluid class="home">
    <div class="categories">
      <Categories :categories="categories" />
    </div>
    <div class="products"  v-bind:class="{ productsFull: isBasketEmtpy }">
      <Products :products="products" :add="add" :info="info" />
    </div>
    <div class="basket" id="basket" v-bind:class="{ basketEmpty: isBasketEmtpy }">
      <Basket :basket="basket" :add="add" :remove="remove" />
    </div>
    <Product :add="add" />
  </v-container>
</template>

<script>
import store from "@/store";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Basket from "@/components/BasketHorizontal";
// import Basket from "@/components/Basket";
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
    return {
      isBasketEmtpy: false
    };
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
  watch: {
    basket() {
      this.isBasketEmtpy = !this.basket.length;
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
  width: 16vw;
}
.products {
  position: absolute;
  top: 32px;
  left: 9%;
  bottom: 12vh;
  width: 84vw;
}

.basket {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20vh;
}

.basketEmpty {
  display: none;
}

</style>
