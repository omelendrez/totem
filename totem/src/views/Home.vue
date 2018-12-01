<template>
  <v-container fluid class="home">
    <div class="categories">
      <Categories :categories="categories"/>
    </div>
    <div class="products">
      <Products :products="products" :add="add" :info="info"/>
    </div>
    <div class="basket" id="basket">
      <Basket :basket="basket" :add="add" :remove="remove"/>
    </div>
    <Product :add="add"/>
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
    },
    order() {
      return store.getters.order
    }
  },
  watch: {
    basket() {
      this.isBasketEmtpy = !this.basket.length;
    }
  },
  methods: {
    add(item) {
      setTimeout(() => {
        store.dispatch("add", item);
      }, 200);
    },
    info(item) {
      setTimeout(() => {
        store.dispatch("info", item);
      }, 200);
    },
    remove(item) {
      setTimeout(() => {
        store.dispatch("remove", item);
      }, 200);
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
  height: 80vh;
  width: 16vw;
}
.products {
  position: absolute;
  top: 32px;
  left: 9%;
  height: 76vh;
  width: 84vw;
}
.basket {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20vh;
  background-color: #fff;
}
</style>
