<template>
  <div class="loading" v-if="status">
    <v-layout align-center justify-center column>
      <v-progress-circular color="primary" :size="50" :width="5" indeterminate></v-progress-circular>
    </v-layout>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Loading",
  store,
  computed: {
    status() {
      return store.getters.status === "loading";
    }
  }
};
</script>

<style scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.2);
  z-index: 99;
  cursor: progress;
}
.v-progress-circular {
  position: absolute;
  top: 50%;
}
</style>
