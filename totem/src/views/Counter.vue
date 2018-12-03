<template>
  <v-container fluid class="counter"></v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Counter",
  store,
  mounted() {
    store.dispatch("loadOrderItems");
    setInterval(() => {
      store.dispatch("loadOrderItems");
    }, interval);
  }
};
</script>
<style scoped>
.counter {
  margin-top: 32px;
}
</style>
