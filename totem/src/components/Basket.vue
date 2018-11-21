<template>
  <v-container fluid class="basket">
    <v-layout row justify-center>
      <v-flex>
        <v-card raised>
          <v-toolbar color="info" dark>
            <v-btn icon>
              <v-icon>shopping_cart</v-icon>
            <span class="amount">
              $ {{total}}
            </span>
            </v-btn>
            <v-btn color="warning" small class="black--text" v-if="total>0" @click="checkout=true">
              Pagar
            </v-btn>
          </v-toolbar>
          <v-list>
            <template v-for="(item, index) in items">
              <v-divider :key="`div${index}`"></v-divider>
              <v-subheader :key="`sub${index}`">
                <span class="title">{{ item.name }}</span>
              </v-subheader>
              <v-list-tile :key="`tile${index}`"  class="mb-4">
                <v-img :src="item.image" height="48px" contain></v-img>
                  <v-btn fab dark small absolute top right color="success" @click="info(item)">
                    <v-icon>local_offer</v-icon>
                  </v-btn>
                <v-list-tile-content>
                  <span>{{item.quantity}}</span>
                  <span class="title" v-html="`$ ${item.price.replace('.00','')}`"></span>
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
        <v-toolbar dark fixed color="primary">
          <v-btn icon dark @click="checkout = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="warning" class="black--text"  @click="checkout = false">Volver a productos</v-btn>
        </v-toolbar>
        <Checkout :items="basket" :total="total" :remove="remove" />
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
      if (this.checkout) {
        this.checkout = this.items.length;
      }
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
.title {
  font-size: x-small !important;
}
.amount {

}
</style>
