<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout row wrap>
      <v-flex mb-4 xs4 v-for="(item, index) in items" :key="index">
        <v-card ripple raised>
          <v-img :src="`http://localhost:3000/${item.image}`" height="200px" contain>
            <v-container fill-height fluid pa-4>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="transparent" v-text="item.name"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-actions>
            <v-btn dark fab absolute bottom right color="pink">
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
