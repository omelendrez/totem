<template>
  <v-container fluid grid-list-lg class="products">
    <v-layout wrap>
      <v-flex xs6 mb-3 v-for="(item, index) in items" :key="index" v-show="item.image">
        <v-content>
          <v-card ripple height="300" width="410">
            <v-img :src="item.image" class="image"></v-img>
            <span class="name">{{item.name}}</span>
            <v-card-actions>
              <span class="price">{{`$ ${item.price.replace('.00','')}`}}</span>
              <v-btn dark fab absolute right color="primary" @click="add(item)">
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn fab dark color="pink" absolute left @click="info(item)">
                <v-icon>live_help</v-icon>
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
  background-color: #999;
}
.name {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.4em;
  font-weight: bold;
  border: 2px solid #000;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #000;
  background-color: #ffc600;
}
.price {
  position: absolute;
  left: 40%;
  font-size: 2em;
  font-weight: bold;
  border: 1px solid #ffc600;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #ffc600;
  background-color: #333;
  box-shadow: 1px 2px 4px #aaa;
}
.image {
  height: 280px;
}
</style>
