<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-layout class="product">
      <v-flex mx-4 my-4>
        <v-card>
          <v-img
            :src="item.image"
            contain
            class="image"
          ></v-img>
          <v-card-title>
            <div>
              <div class="name">{{item.name}}</div>
              <div>{{item.description}}</div>
              <div class="price">$ {{item.price}}</div>
            </div>
          </v-card-title>
          <v-card-actions class="mb-2">
            <v-btn fab absolute bottom left color="secondary" @click="close(item)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn dark fab absolute bottom right color="primary" @click="addProduct(item)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
import store from "@/store";
export default {
  name: "Product",
  store,
  props: {
    add: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      dialog: false,
      item: {}
    };
  },
  computed: {
    product() {
      return store.getters.product;
    }
  },
  watch: {
    product() {
      this.product.price = this.product.price ? this.product.price.replace('.00', '') : this.product.price
      this.item = this.product;
      this.dialog = this.product.name;
    }
  },
  methods: {
    close() {
      const item = {};
      store.dispatch("info", item);
    },
    addProduct(item) {
      this.add(item);
    }
  }
};
</script>
<style scoped>
.product {
  background: #ee3542;
}
.border-0 {
  border: 0;
}
.name {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.5em;
  font-weight: bold;
  border: 1px solid #ffc600;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #000;
  background-color: #ffc600;
}

.price {
  font-size: 2em;
  font-weight: bold;
  border: 1px solid #000;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #ffc600;
  background-color: #333;
}
</style>
