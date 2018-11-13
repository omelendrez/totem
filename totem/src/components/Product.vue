<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-layout class="product">
      <v-flex>
        <v-card>
          <v-img
            :src="product.image"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{product.name}}</h3>
              <div>{{product.description}}</div>
              <h3 class="headline">$ {{product.price}}</h3>
            </div>
          </v-card-title>
          <v-card-actions class="mb-5">
            <v-btn fab absolute bottom left color="light" @click="close(product)">
              <v-icon>not_interested</v-icon>
            </v-btn>
            <v-btn dark fab absolute bottom right color="primary" @click="addProduct(product)">
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
      dialog: false
    };
  },
  computed: {
    product() {
      return store.getters.product;
    }
  },
  watch: {
    product() {
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
      const reset = {};
      store.dispatch("info", reset);
    }
  }
};
</script>
<style scoped>
.product {
  background: #fff !important;
}
.border-0 {
  border: 0;
}
</style>
