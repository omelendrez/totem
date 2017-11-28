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
import Store from "../store/store";

export default {
  store: Store,
  data() {
    return { timeoutID: 0 };
  },
  computed: {
    categories() {
      return Store.state.categories;
    }
  },
  created() {
    Store.dispatch("LOAD_CATEGORIES");
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
      Store.dispatch("FILTER_BY_CATEGORY", id);
    },
    resetTimer() {
      window.clearTimeout(this.timeoutID);
      this.goActive();
    },
    startTimer() {
      this.timeoutID = window.setTimeout(this.goInactive, 5000);
    },
    goActive() {
      this.startTimer();
    },
    goInactive() {
      Store.dispatch("RESET_VIEW");
      Store.dispatch("LOAD_CATEGORIES");
      Store.dispatch("LOAD_PRODUCTS");
    }
  }
};
</script>

<style scoped>
.categories {
  overflow: auto;
  width: 100%;
}

.category {
  margin: 30px;
  text-align: center;
  width: 40%;
}

::-webkit-scrollbar {
  width: 0px;
}

.category .text {
  font-size: 14px;
}
</style>