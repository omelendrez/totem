<template>
  <v-container fluid grid-list-lg class="categories">
    <v-layout row wrap>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card
          ripple
          class="inactive"
          @click.native="selectCategory(item)"
          v-bind:class="{ active: isActive(item)}"
        >
          <v-img :src="item.image" contain></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Categories",
  store,
  props: {
    categories: {
      type: Array,
      default: null
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
    categories() {
      this.items = this.categories;
    }
  },
  methods: {
    selectCategory(item) {
      store.dispatch("selectCategory", item);
    },
    resetCategory() {
      store.dispatch("selectCategory", null);
    },
    isActive(item) {
      return this.selectedCategory && item.id === this.selectedCategory.id;
    }
  }
};
</script>
<style scoped>
.categories {
  padding: 0;
}
.inactive {
  background-color: rgba(240, 52, 52, 0.2);
}
.active {
  background-color: #fff;
}
</style>
