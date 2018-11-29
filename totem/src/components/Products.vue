<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs4 pa-5 v-for="(item, index) in items" :key="index">
        <v-content>
          <v-card ripple>
            <v-img :src="item.image" contain :height="217" @click="info(item)"></v-img>
            <v-card-actions>
              <span class="price">{{`$ ${item.price.replace('.00','')}`}}</span>
              <v-btn dark fab absolute bottom right color="primary" @click="add(item)">
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-content>
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
  font-weight: bold;
}
</style>
