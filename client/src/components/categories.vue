<template>
  <div class="categories">
    <md-layout md-align="center" md-column>
      <h1>Categorías</h1>
      <md-button v-if="selectedCategory" class="md-accent md-raised" v-on:click.native="back()">Volver</md-button>
      <md-layout md-align="center" v-if="category === selectedCategory || !selectedCategory" v-on:click.native="setCategory(category)" v-for="category in categories" :key="category.id" :md-item="category">
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
import store from "@/store";
import { types } from "@/store/mutation-types";
import { interval } from '@/utils'

export default {
  store,
  data() {
    return { intervalID: 0 };
  },
  computed: {
    categories() {
      store.dispatch(types.SEND_AKNOWLEDGE);
      return store.getters.categories;
    },
    selectedCategory() {
      return store.getters.selectedCategory
    },
    config() {
      return store.getters.config
    }
  },
  watch: {
    config() {
      if (this.config.updates === 1) {
        this.refresh()
      }
    }
  },
  created() {
    store.dispatch(types.LOAD_CATEGORIES);
    document.addEventListener("mousemove", this.resetTimer, false);
    document.addEventListener("mousedown", this.resetTimer, false);
    document.addEventListener("keypress", this.resetTimer, false);
    document.addEventListener("DOMMouseScroll", this.resetTimer, false);
    document.addEventListener("mousewheel", this.resetTimer, false);
    document.addEventListener("touchmove", this.resetTimer, false);
    document.addEventListener("MSPointerMove", this.resetTimer, false);
    this.startTimer();
  },
  methods: {
    setCategory(category) {
      store.dispatch(types.FILTER_BY_CATEGORY, category);
    },
    resetTimer() {
      window.clearInterval(this.intervalID);
      this.goActive();
    },
    startTimer() {
      this.intervalID = window.setInterval(this.checkUpdates, interval);
    },
    goActive() {
      this.startTimer();
    },
    checkUpdates() {
      store.dispatch(types.CHECK_UPDATES);
    },
    back() {
      store.dispatch(types.RESET_VIEW)
    },
    refresh() {
      store.dispatch(types.LOAD_CATEGORIES);
      store.dispatch(types.LOAD_PRODUCTS);
    }
  }
};
</script>

<style scoped>
.categories {
  overflow: auto;
  text-align: center;
  width: 100%;
  border-right: 1px solid lavender;
  padding: 0;
}

.category {
  margin-bottom: 40px;
  text-align: center;
}

::-webkit-scrollbar {
  width: 0px;
}

.category .text {
  font-size: 14px;
}
</style>
