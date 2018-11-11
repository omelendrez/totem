<template>
  <v-container fluid grid-list-lg class="products">
    <v-alert v-if="selectedCategory" type="info" :value="true">
      Mostrando categoría <strong> {{selectedCategory.name}}</strong>
    </v-alert>
    <v-layout row wrap>
      <v-flex mb-4 md4 v-for="(item, index) in items" :key="index">
        <v-card ripple raised>
          <v-img :src="item.image" height="180px" contain>
            <v-container fill-height fluid mt-3>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <div class="transparent" v-text="item.category.name"></div>
                  <h3 class="transparent" v-text="item.name"></h3>
                  <h2 class="transparent" v-text="`$ ${item.price.replace('.00','')}`"></h2>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-actions  class="mb-4">
            <v-btn fab dark absolute bottom left color="success" @click="info(item)">
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
      } else {
        this.items = this.products.filter(
          item => item.category_id === this.selectedCategory.id
        );
      }
    }
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
