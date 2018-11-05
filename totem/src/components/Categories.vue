<template>
  <v-container fluid grid-list-lg class="categories">
    <v-layout row wrap>
      <v-flex xs12 v-for="(item, index) in items" :key="index">
        <v-card ripple flat>
          <v-img :src="`http://localhost:3000/${item.image}`" height="80px" contain>
            <v-container fill-height fluid pa-2>
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
.categories {
  overflow-y: scroll;
  min-width: 100%;
}
::-webkit-scrollbar {
  width: 0px;
}
.transparent {
  background: rgb(255, 255, 255, 0.6) !important;
}
</style>
