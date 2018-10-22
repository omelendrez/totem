<template>
  <div class="categories">

    <md-layout md-align="center" md-column>

      <md-layout md-align="center" v-on:click.native="setCategory(category.id)" v-for="category in categories" :key="category.id" :md-item="category">
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
import { interval } from '@/utils'

export default {
  store,
  data() {
    return { intervalID: 0 };
  },
  computed: {
    categories() {
      store.dispatch("SEND_AKNOWLEDGE");
      return store.getters.categories;
    },
    config() {
      return store.getters.config
    }
  },
  watch: {
    config() {
      if(this.config.updates === 1) {
        this.refresh()
      }
    }
  },
  created() {
    store.dispatch("LOAD_CATEGORIES");
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
    setCategory(id) {
      store.dispatch("FILTER_BY_CATEGORY", id);
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
      store.dispatch("CHECK_UPDATES");
    },
    refresh() {
      store.dispatch("RESET_VIEW");
      store.dispatch("LOAD_CATEGORIES");
      store.dispatch("LOAD_PRODUCTS");
    }
  }
};
</script>

<style scoped>
.categories {
  overflow: auto;
  width: 100%;
  border-right: 1px solid lavender;
}

.category {
  margin: 30px;
  text-align: center;
}

::-webkit-scrollbar {
  width: 0px;
}

.md-image {
  width: 50%;
}

.category .text {
  font-size: 14px;
}
</style>
