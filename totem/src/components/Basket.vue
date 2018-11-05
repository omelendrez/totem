<template>
  <v-container fluid class="basket">
    <v-layout row>
      <v-flex>
        <v-card>
          <v-toolbar color="info" dark>
            <v-toolbar-title>Carrito</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="amount">
              $ {{total}}
            </span>
            <v-btn icon>
              <v-icon>shopping_cart</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-divider :key="index"></v-divider>
              <v-subheader :key="index">
                {{ item.name }}
              </v-subheader>
              <v-list-tile :key="index" @click="">
                <v-img :src="`http://localhost:3000/${item.image}`" contain></v-img>
                <v-list-tile-content>
                  <v-list-tile-sub-title v-html="item.category.name"></v-list-tile-sub-title>
                  <v-list-tile-title v-html="item.price"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Basket",
  store,
  data() {
    return {
      items: [],
      total: 0
    };
  },
  computed: {
    products() {
      return store.getters.products;
    }
  },
  watch: {
    products() {
      let counter = 0;
      let total = 0;
      const products = []
      this.products.map(item => {
        counter++;
        if (counter < 5) {
          products.push(item);
          total += parseFloat(item.price);
        }
      });
      this.items = products;
      this.total = total;
    }
  },
  created() {
    store.dispatch("loadProducts");
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
  font-size: 2em;
}
</style>
