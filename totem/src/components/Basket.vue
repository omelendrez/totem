<template>
  <v-container fluid class="basket">
    <v-layout row justify-center>
      <v-flex>
        <v-card>
          <v-toolbar color="info" dark>
            <v-btn icon>
              <v-icon>shopping_cart</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span class="amount">
              $ {{total}}
            </span>
            <v-btn color="warning" class="black--text" v-if="total>0" @click="checkout=!checkout">
              Pagar
            </v-btn>
          </v-toolbar>
          <v-list>
            <template v-for="(item, index) in items">
              <v-divider :key="`div${index}`"></v-divider>
              <v-subheader :key="`sub${index}`">
                <strong>{{ item.name }}</strong>
              </v-subheader>
              <v-list-tile :key="`tile${index}`"  class="mb-4">
                <v-img :src="item.image" height="48px" contain></v-img>
                <v-list-tile-content>
                  <h3 class="ml-3" v-html="`$ ${item.price.replace('.00','')}`"></h3>
                  <v-btn fab dark small absolute top right color="success" @click="info(item)">
                    <v-icon>local_offer</v-icon>
                  </v-btn>
                  <v-btn dark small fab absolute bottom right color="pink" @click="remove(index)">
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
        <Checkout :items="basket" />
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
    info: {
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
        basket.push(item);
        total += parseFloat(item.price);
      });
      this.items = basket;
      this.total = total;
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
  width: 0px;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
}
.amount {
  font-size: 1.4em;
  margin-right: 20px;
}
</style>
