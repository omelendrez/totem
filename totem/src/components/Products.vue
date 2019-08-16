<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs3 mb-4 v-for="(item, index) in items" :key="index" v-show="item.image">
        <v-content>
          <v-card ripple>
            <v-img contain :src="item.image" class="image"></v-img>
            <v-card-actions>
              <span class="price">{{`$ ${item.price.replace('.00','')}`}}</span>
              <v-btn fab dark color="pink" absolute left @click="info(item)">
                <v-icon>live_help</v-icon>
              </v-btn>
              <v-btn dark fab absolute right color="primary" @click="add(item)">
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
  mounted() {
    this.items = this.products;
  }
};
</script>
<style scoped>
.products {
  padding: 0;
  overflow-y: scroll;
  background-color: #efefef;
  -webkit-overflow-scrolling: touch;
}
.products::-webkit-scrollbar {
  width: 18px;
  height: 0;
  background-color: #dadada;
}
.products::-webkit-scrollbar-thumb {
  background-color: #aaa;
}
.price {
  position: absolute;
  top: 4px;
  right: 29px;
  min-width: 84px;
  font-size: 2em;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #000;
  background-color: #fff;
}
</style>
