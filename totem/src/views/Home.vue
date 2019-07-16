<template>
  <v-container fluid class="home">
    <div class="basket" id="basket">
      <Basket :basket="basket" :add="add" :remove="remove" />
    </div>
    <div class="categories">
      <Categories :categories="categories" />
    </div>
    <div class="products">
      <Products :products="products" :add="add" :info="info" />
    </div>
    <Product :add="add" />
    <div class="drinks" id="drinks" v-show="showDrinks">
      <Drinks :products="products" :addDrink="addDrink" />
    </div>
    <Processing :message="errorMessage" />
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
import Processing from "@/components/Processing";
import { drinkFieldName } from "@/config";
import { setupTimers, stopTimers } from "@/utils";

export default {
  name: "Home",
  store,
  components: {
    Categories,
    Products,
    Basket,
    Product,
    Drinks,
    Processing
  },
  data() {
    return {
      isBasketEmtpy: false,
      showDrinks: false,
      selectedProduct: {},
      errorMessage: null
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
    },
    status() {
      return store.getters.status;
    },
    apiError() {
      return store.getters.apiError;
    },
    totem() {
      return store.getters.totem;
    }
  },
  watch: {
    totem() {
      this.totemActive = this.totem.status_id === 1;
    },
    basket() {
      this.isBasketEmtpy = !this.basket.length;
      this.showDrinks = false;
    },
    status() {
      if (this.status === "error" && this.apiError) {
        if (this.apiError.error) {
          this.errorMessage = this.apiError.message;
        }
      } else {
        this.errorMessage = "";
      }
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
    setupTimers();
  },
  beforeDestroy() {
    stopTimers();
  }
};
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: absolute;
}
.basket {
  position: absolute;
  left: 1px;
  width: 1075px;
  top: 71px;
  z-index: 2;
}
.categories {
  position: absolute;
  top: 106px;
  left: 1px;
  height: auto;
  width: 200px;
}
.products {
  position: absolute;
  top: 106px;
  left: 108px;
  height: 1710px;
  width: 862px;
}
.drinks {
  position: absolute;
  top: 106px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  z-index: 202;
}
</style>
