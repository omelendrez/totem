<template>
  <v-container fluid class="turns">
    <v-flex xs12>
      <div class="resultContainer">
        <v-layout justify-space-around fill-height>
          <div class="item elevation-5">
            <h1>En preparación</h1>
            <div
              class="order-number"
              v-for="(item, index) in inPreparation"
              :key="index"
            >{{item.order_number}}</div>
          </div>
          <div class="item elevation-5">
            <h1>Para entregar</h1>
            <div
              class="order-number"
              v-for="(item, index) in toDeliver"
              :key="index"
            >{{item.order_number}}</div>
          </div>
        </v-layout>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Turns",
  store,
  computed: {
    orderTurns() {
      return store.getters.orderTurns;
    }
  },
  watch: {
    orderTurns() {
      this.inPreparation = this.orderTurns.filter(item => item.status_id === 1);
      this.toDeliver = this.orderTurns.filter(item => item.status_id === 2);
    }
  },
  data() {
    return {
      inPreparation: [],
      toDeliver: []
    };
  },
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
}
.item {
  width: 80vh;
  text-align: center;
  padding: 20px;
  height: 80vh;
}
.order-number {
  font-size: 3em;
  font-weight: bold;
}
</style>
