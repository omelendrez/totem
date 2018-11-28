<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs4 mb-5 mt-4 v-for="(item, index) in items" :key="index">
        <v-card ripple>
          <v-img :src="item.image" contain>
          </v-img>
          <v-card-actions>
            <span v-text="`$ ${item.price.replace('.00','')}`"></span>
            <v-btn fab absolute top left color="success" @click="info(item)">
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
      if (!this.selectedCategory) {
        this.items = this.products;
        return;
      }
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
.price {

}
</style>
