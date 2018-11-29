<template>
  <v-container fluid grid-list-lg class="categories">
    <v-layout row wrap>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card ripple @click.native="selectCategory(item)">
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
      setTimeout(() => {
        store.dispatch("selectCategory", item);
      }, 200);
    },
    resetCategory() {
      setTimeout(() => {
        store.dispatch("selectCategory", null);
      }, 200);
    }
  }
};
</script>
<style scoped>
.categories {
  overflow-y: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
  font-size: xx-small;
}
</style>
