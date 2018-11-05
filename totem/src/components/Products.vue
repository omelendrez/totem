<template>
  <v-container>
    <v-card v-for="(item, index) in items" :key="index">
      <v-card-text>
        {{item.name}}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Products",
  store,
  data() {
    return {
      items: []
    };
  },
  computed: {
    products() {
      return store.getters.products;
    }
  },
  watch: {
    products() {
      this.items = this.products;
    }
  },
  created() {
    store.dispatch("loadProducts");
  }
};
</script>
<style scoped>
</style>
