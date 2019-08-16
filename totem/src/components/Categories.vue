<template>
  <v-container fluid grid-list-lg class="categories">
    <v-layout row wrap>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card
          ripple
          class="category"
          v-bind:class="{ active: isActive(item)}"
          @click.stop="selectCategory(item)"
        >
          <v-img :src="item.image">
            <v-icon right>done_all</v-icon>
          </v-img>
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
.category i {
  display: none;
  position: absolute;
  top: 30px;
  right: 10px;
  color: #42a5f5;
}

.active i {
  display: block;
}
</style>
