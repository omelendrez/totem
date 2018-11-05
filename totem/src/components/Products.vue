<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout row wrap>
      <v-flex mb-4 md4 v-for="(item, index) in items" :key="index">
        <v-card ripple raised>
          <v-img :src="`http://localhost:3000/${item.image}`" height="180px" contain>
            <v-container fill-height fluid mt-3>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <div class="transparent" v-text="item.category.name"></div>
                  <h3 class="transparent" v-text="item.name"></h3>
                  <h2 class="transparent" v-text="`$ ${item.price}`"></h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-actions  class="mb-4">
            <v-btn fab dark absolute bottom left color="success" @click="add(item)">
              <v-icon>local_offer</v-icon>
            </v-btn>
            <v-btn dark fab absolute bottom right color="primary" @click="add(item)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Products",
  store,
  data() {
    return {
      items: []
    };
  },
  computed: {
    products() {
      return store.getters.products;
    }
  },
  watch: {
    products() {
      this.items = this.products;
    }
  },
  methods: {
    add(item) {
      store.dispatch("add", item);
    }
  },
  created() {
    store.dispatch("loadProducts");
  }
};
</script>
<style scoped>
.products {
  overflow-y: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0px;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
}
</style>
