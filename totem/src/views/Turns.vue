<template>
  <v-container fluid class="turns"></v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Turns",
  store,
  mounted() {
    store.dispatch("loadOrderTurns");
    setInterval(() => {
      store.dispatch("loadOrderTurns");
    }, interval);
  }
};
</script>
<style scoped>
.turns {
  margin-top: 32px;
}
</style>
