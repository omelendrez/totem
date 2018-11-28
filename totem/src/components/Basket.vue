<template>
  <v-container fluid class="basket">
    <v-layout row justify-center>
      <v-flex>
        <v-card raised>
          <v-toolbar color="info" dark>
            <v-btn icon>
              <v-icon>shopping_cart</v-icon>
              <span class="amount">$ {{total}}</span>
            </v-btn>
            <v-btn
              color="warning"
              round
              class="black--text"
              v-if="total>0"
              @click="checkout=true"
            >Pagar</v-btn>
          </v-toolbar>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-divider :key="`div${index}`"></v-divider>
              <v-subheader :key="`sub${index}`">
                <span class="title">{{ item.name }}</span>
              </v-subheader>
              <v-list-tile :key="`tile${index}`" class="mb-4">
                <v-img :src="item.image" contain></v-img>
                <v-btn fab dark small absolute top right color="primary" @click="add(item)">
                  <v-icon>add</v-icon>
                </v-btn>
                <v-list-tile-content>
                  <span class="quantity">{{`${item.quantity} X $ ${item.price.replace('.00','')}`}}</span>
                  <span class="totalPrice">{{`Total: $ ${item.totalPrice.replace('.00','')}`}}</span>
                  <v-btn dark small fab absolute bottom right color="pink" @click="doRemove(index)">
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
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
    doRemove(index) {
      const id = this.items[index].id;
      const basketIndex = this.basket.findIndex(item => item.id === id);
      this.remove(basketIndex);
    }
  }
};
</script>
<style scoped>
.basket {
  overflow-y: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
}
.title {
  font-size: x-small !important;
}
.quantity {
  font-size: small !important;
  margin-left: 20px !important;
}
.price {
  font-size: small !important;
}
.totalPrice {
  margin-left: 20px !important;
  font-weight: bold !important;
  font-size: small !important;
}
</style>
