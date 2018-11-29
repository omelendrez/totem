<template>
  <v-dialog v-model="dialog" width="384px">
    <v-layout class="product">
      <v-flex mx-4 my-4>
        <v-card>
          <v-img
            :src="item.image"
            contain
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{item.name}}</h3>
              <div>{{item.description}}</div>
              <h3 class="headline">$ {{item.price}}</h3>
            </div>
          </v-card-title>
          <v-card-actions class="mb-2">
            <v-btn fab absolute bottom left color="light" @click="close(item)">
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
      const reset = {};
      store.dispatch("info", reset);
    }
  }
};
</script>
<style scoped>
.product {
  background: brown;
}
.border-0 {
  border: 0;
}
</style>
