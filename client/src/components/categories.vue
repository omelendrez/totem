<template>
  <div class="categories">

    <md-layout md-align="center" md-column>

      <md-layout v-on:click.native="setCategory(category.id)" v-for="category in categories" :key="category.id" :md-item="category">
        <div class="category">
          <md-image :md-src="category.image"></md-image>
          <div class="text">
            {{category.name}}
          </div>
        </div>
      </md-layout>

    </md-layout>
  </div>
</template>

<script>

import Store from '../store/store'

export default {
  store: Store,
  computed: {
    categories() {
      return Store.state.categories;
    }
  },
  created() {
    Store.dispatch('LOAD_CATEGORIES');
  },
  methods: {
    setCategory(id) {
      Store.dispatch('FILTER_BY_CATEGORY', id);
    }
  }
}

</script>

<style scoped>
.categories {
  overflow: auto;
  width: 100%;
}

.category {
  margin: 16px;
  text-align: center;
  width: 40%;
}

html {
  overflow: auto;
}

body {
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  padding: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>