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
    <div class="drinks" id="drinks" v-show="showDrinks">
      <Drinks :products="products" :addDrink="addDrink"/>
    </div>
  </v-container>
</template>

<script>
import store from "@/store";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Basket from "@/components/BasketHorizontal";
// import Basket from "@/components/Basket";
import Product from "@/components/Product";
import Drinks from "@/components/Drinks";
import { drinkFieldName } from "@/config";

export default {
  name: "Home",
  store,
  components: {
    Categories,
    Products,
    Basket,
    Product,
    Drinks
  },
  data() {
    return {
      isBasketEmtpy: false,
      showDrinks: false,
      selectedProduct: {}
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
      return store.getters.order;
    }
  },
  watch: {
    basket() {
      this.isBasketEmtpy = !this.basket.length;
    }
  },
  methods: {
    add(item) {
      const isCombo = item.ticket_text.includes(drinkFieldName);
      if (isCombo) {
        this.showDrinks = true;
        this.selectedProduct = item;
        return;
      }
      store.dispatch("add", item);
      const reset = {};
      store.dispatch("info", reset);
    },
    addDrink(item) {
      let product = {};
      Object.assign(product, this.selectedProduct);
      product.ticket_text = product.ticket_text.replace(
        drinkFieldName,
        item.ticket_text
      );
      store.dispatch("add", product);
      this.showDrinks = false;
      const reset = {};
      store.dispatch("info", reset);
    },
    info(item) {
      store.dispatch("info", item);
    },
    remove(item) {
      store.dispatch("remove", item);
    }
  },
  mounted() {
    store.dispatch("loadCategories");
    store.dispatch("loadProducts");
  }
};
</script>
<style scoped>
.categories {
  position: absolute;
  top: 106px;
  left: 1px;
  height: auto;
  width: 210px;
}
.products {
  position: absolute;
  top: 106px;
  left: 108px;
  height: 1710px;
  width: 862px;
}

.basket {
  position: absolute;
  left: 1px;
  width: 1075px;
  top: 71px;
}
.home {
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}
.drinks {
  position: absolute;
  top: 106px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  z-index: 4;
}
</style>
