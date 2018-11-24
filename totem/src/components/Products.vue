<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs4 mb-5 v-for="(item, index) in items" :key="index">
        <v-card ripple>
          <v-img :src="item.image" height="138px" contain>
            <v-container>
              <v-layout>
                <v-flex xs12 class="transparent">
                  <div v-text="item.category.name"></div>
                  <span v-text="item.name"></span>
                  <h2 v-text="`$ ${item.price.replace('.00','')}`"></h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-actions  class="mb-4">
            <v-btn fab dark small absolute top left color="success" @click="info(item)">
              <v-icon>local_offer</v-icon>
            </v-btn>
            <v-btn dark fab small absolute bottom right color="primary" @click="add(item)">
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
  props: {
    products: {
      type: Array,
      default: null
    },
    add: {
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
      items: []
    };
  },
  computed: {
    selectedCategory() {
      return store.getters.selectedCategory;
    }
  },
  watch: {
    products() {
      this.items = this.products;
    },
    selectedCategory() {
      this.items = this.products.filter(
        item => item.category_id === this.selectedCategory.id
      );
    }
  },
  created() {
    this.items = this.products;
  }
};
</script>
<style scoped>
.products {
  overflow-y: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
  font-size: x-small;
}
</style>
