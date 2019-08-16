<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-layout class="product">
      <v-flex mx-4 my-4>
        <v-card>
          <v-img :src="item.image" contain class="image"></v-img>
          <v-card-title>
            <div>
              <div class="description">{{item.description}}</div>
              <span class="price">$ {{item.price}}</span>
            </div>
          </v-card-title>
          <v-card-actions class="mb-2">
            <v-btn fab absolute bottom left color="secondary" @click.stop="close(item)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn dark fab absolute bottom right color="primary" @click.stop="addProduct(item)">
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
      this.product.price = this.product.price
        ? this.product.price.replace(".00", "")
        : this.product.price;
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
.description {
  font-size: 1.2em;
}
.price {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 80px;
  font-size: 2em;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  color: #000;
  background-color: #fff;
  font-size: 3em;
}
</style>
