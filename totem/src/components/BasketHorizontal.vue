<template>
  <v-container fluid class="basket">
    <v-toolbar color="info" dark dense flat>
      <v-icon>shopping_cart</v-icon>
      <span class="amount">$ {{total}}</span>
      <v-divider></v-divider>
      <v-btn color="success" round v-if="total>0" @click="checkout=true">Pagar orden</v-btn>
      <v-btn color="error" round v-if="total>0" @click="cancel">Cancelar orden</v-btn>
    </v-toolbar>
    <v-layout wrap>
      <v-flex xs2 pa-3 v-for="(item, index) in items" :key="index">
        <v-content>
          <v-img :src="item.image"></v-img>
          <div class="quantity">{{`${item.quantity} X $ ${item.price.replace('.00','')}`}}</div>
          <div class="totalPrice">{{`Total: $ ${item.totalPrice.replace('.00','')}`}}</div>
          <v-btn fab dark small absolute top right color="primary" @click="add(item)">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn dark small fab absolute bottom right color="pink" @click="doRemove(item)">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-content>
      </v-flex>
    </v-layout>
    <v-layout row justify-center fill-height>
      <v-dialog v-model="checkout" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark fixed color="primary">
          <v-btn icon dark @click="checkout = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="warning" class="black--text" @click="checkout = false">Volver a productos</v-btn>
        </v-toolbar>
        <Checkout :items="items" :total="total" :remove="doRemove"/>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
import Checkout from "@/components/Checkout";
export default {
  name: "Basket",
  store,
  components: {
    Checkout
  },
  props: {
    basket: {
      type: Array,
      default: null
    },
    remove: {
      type: Function,
      default: undefined
    },
    add: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      items: [],
      total: 0,
      checkout: false
    };
  },
  watch: {
    basket() {
      let total = 0;
      const basket = [];
      this.basket.map(item => {
        let itm = basket.find(itm => itm.id === item.id);
        if (itm) {
          itm.quantity = itm.quantity + 1;
          itm.totalPrice = (parseFloat(itm.price) * itm.quantity).toString();
        } else {
          itm = item;
          itm.quantity = 1;
          itm.totalPrice = parseFloat(itm.price).toString();
          basket.push(itm);
        }
        total += parseFloat(itm.price);
      });
      this.items = basket;
      this.total = total;
      if (this.checkout) {
        this.checkout = this.items.length;
      }
    }
  },
  methods: {
    doRemove(product) {
      const id = product.id;
      const basketIndex = this.basket.findIndex(item => item.id === id);
      this.remove(basketIndex);
    },
    cancel() {
      this.remove(-1);
    }
  }
};
</script>
<style scoped>
.basket {
  overflow-x: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
}
.amount {
  font-size: 2em;
}
.quantity,
.price,
.totalPrice {
  margin-left: 6px;
}

.totalPrice {
  text-transform: uppercase;
  font-weight: bold !important;
}
</style>
