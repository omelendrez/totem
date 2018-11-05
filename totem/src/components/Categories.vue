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
  name: "Categories",
  store,
  data() {
    return {
      items: []
    };
  },
  computed: {
    categories() {
      return store.getters.categories;
    }
  },
  watch: {
    categories() {
      this.items = this.categories;
    }
  },
  created() {
    store.dispatch("loadCategories");
  }
};
</script>
<style scoped>
</style>
