<template>
  <v-container fluid class="home">
    <Intro v-show="showIntro" />
    <div v-show="!showIntro">
      <div class="categories">
        <Categories :categories="categories" />
      </div>
      <div class="products">
        <Products :products="products" :info="info" />
      </div>
      <Product :add="add" />
      <div class="drinks" id="drinks" v-show="showDrinks">
        <Drinks :products="products" :addDrink="addDrink" :selectedProduct="selectedProduct" />
      </div>
      <div class="basket" id="basket">
        <Basket :basket="basket" :add="add" :remove="remove" />
      </div>
      <Processing :message="errorMessage" />
      <Test v-if="showTest" :hideTest="hideTest" />
      <v-btn
        v-if="!showTest"
        small
        fab
        absolute
        center
        right
        color="#ee3542"
        depressed
        :ripple="false"
        @dblclick="goTest"
      ></v-btn>
    </div>
    <Confirm
      :title="title"
      :message="message"
      :confirm="verifyContinue"
      :button-ok-msg="buttonOkMsg"
      :button-no-msg="buttonNoMsg"
    />
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
import { setupTimers, stopTimers, doInactive } from "@/utils";
import Test from "@/components/Test";
import Intro from "@/components/Intro";
import Confirm from "@/components/Confirm";

export default {
  name: "Home",
  store,
  components: {
    Categories,
    Products,
    Basket,
    Product,
    Drinks,
    Processing,
    Test,
    Intro,
    Confirm
  },
  data() {
    return {
      isBasketEmtpy: false,
      showDrinks: false,
      selectedProduct: {},
      errorMessage: null,
      showTest: false,
      title: "",
      message: "",
      buttonOkMsg: "",
      buttonNoMsg: ""
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
    },
    showIntro() {
      return store.getters.showIntro;
    },
    showResetAlert() {
      return store.getters.showResetAlert;
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
    },
    showResetAlert() {
      if (this.showResetAlert) {
        store.dispatch("setShowResetAlert", false);
        if (this.basket.length === 0) {
          return doInactive();
        }
        this.title = "Inactividad detectada";
        this.message =
          "Se ha detectado inactividad por más de 5 minutos. Deseas continuar con la orden?";
        this.buttonOkMsg = "Si, continuar";
        this.buttonNoMsg = "No, cancelar";
      }
    }
  },
  methods: {
    verifyContinue(value) {
      setupTimers();
      this.message = "";
      if (value) return;
      this.remove(-1);
    },
    goTest() {
      this.showTest = true;
    },
    hideTest() {
      this.showTest = false;
    },
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
      if (!item) {
        this.showDrinks = false;
        return;
      }
      let product = {};
      Object.assign(product, this.selectedProduct);
      product.ticket_text = product.ticket_text.replace(
        drinkFieldName,
        `${item.ticket_text} ${product.category_id === 6 ? "CHICA" : "MEDIANA"}`
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
    window.addEventListener("contextmenu", e => e.preventDefault());
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
  padding: 0;
}
.basket {
  position: absolute;
  left: 0;
  width: 100vw;
  top: 69px;
  z-index: 2;
}
.categories {
  position: absolute;
  top: 106px;
  left: 1px;
  height: auto;
  width: 150px;
}
.products {
  position: absolute;
  top: 106px;
  left: 80px;
  height: 1700px;
  width: 919px;
}
.drinks {
  position: absolute;
  top: 106px;
  left: 1px;
  height: 1700px;
  width: 1076px;
  z-index: 202;
}
</style>
