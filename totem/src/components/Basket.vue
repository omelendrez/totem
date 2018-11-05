<template>
  <v-container fluid class="basket">
    <v-layout row>
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
          </v-toolbar>
          <v-list>
            <template v-for="(item, index) in items">
              <v-divider :key="index"></v-divider>
              <v-subheader :key="index">
                {{ item.name }}
              </v-subheader>
              <v-list-tile :key="index">
                <v-img :src="`http://localhost:3000/${item.image}`" contain></v-img>
                <v-list-tile-content>
                  <h3 v-html="`$ ${item.price}`"></h3>
                  <v-btn dark small fab absolute center right color="pink" @click="remove(item)">
                    <v-icon>clear</v-icon>
                  </v-btn>
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
    basket() {
      return store.getters.basket;
    }
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
  },
  methods: {
    remove(item) {
      store.dispatch("remove", item);
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
  font-size: 1.2em;
}
</style>
