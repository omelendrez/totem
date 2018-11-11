<template>
  <v-container fluid grid-list-lg class="categories">
    <v-layout row wrap>
      <v-btn v-if="selectedCategory" fab @click="resetCategory">
        <v-icon dark>keyboard_backspace</v-icon>
      </v-btn>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card ripple raised @click.native="selectCategory(item)">
          <v-img :src="item.image" contain>
            <v-container fill-height fluid pa-5>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="transparent" v-text="item.name"></span>
                </v-flex>
              </v-layout>
            </v-container>
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
    },
    selectedCategory() {
      if (!this.selectedCategory) {
        this.items = this.categories;
      } else {
        this.items = this.categories.filter(
          item => item.id === this.selectedCategory.id
        );
      }
    }
  },
  methods: {
    selectCategory(item) {
      store.dispatch("selectCategory", item);
    },
    resetCategory() {
      store.dispatch("selectCategory", null);
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
  width: 0px;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
  font-size: 1.2em;
}
</style>
