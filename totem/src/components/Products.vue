<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in items" :key="index" v-show="item.image">
        <v-content>
          <v-card ripple @click.stop="info(item)">
            <v-img contain :src="item.image" class="image"></v-img>
            <v-card-actions v-if="parseInt(item.price)!==0">
              <span class="price">{{`$ ${item.price.replace('.00','')}`}}</span>
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
  padding: 1px;
  overflow-y: scroll;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
.products::-webkit-scrollbar {
  width: 18px;
  height: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
.products::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
.price {
  margin-left: 110px;
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
  background-color: #ee3542;
  border-radius: 30px;
  text-align: center;
  min-width: 80px;
}
</style>
