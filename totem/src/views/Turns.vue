<template>
  <v-container fluid class="turns">
    <v-flex xs12>
      <div class="resultContainer">
        <v-layout justify-space-around fill-height>
          <div class="item elevation-5">
            <h1 class="header in-preparation">En preparación</h1>
            <div class="order-number" v-for="(item, index) in inPreparation" :key="index">
              {{item.order_number_formatted}}
              <v-icon class="order-icon" color="blue" x-large>schedule</v-icon>
            </div>
          </div>
          <div class="item elevation-5">
            <h1 class="header to-deliver">Para retirar</h1>
            <div class="order-number" v-for="(item, index) in toDeliver" :key="index">
              {{item.order_number_formatted}}
              <v-icon class="order-icon" color="green" x-large>thumb_up</v-icon>
            </div>
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
      this.inPreparation = this.orderTurns
        .filter(item => item.status_id === 1)
        .slice(0, 6);
      this.toDeliver = this.orderTurns
        .filter(item => item.status_id === 2)
        .slice(0, 6);
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
.item {
  width: 80vh;
  text-align: center;
  padding: 20px;
  height: 80vh;
}
.order-number {
  font-size: 5em;
  font-weight: bold;
}

.header {
  color: white;
  text-transform: uppercase;
}
.in-preparation {
  background-color: #ee3542;
}
.to-deliver {
  background-color: #ee3542;
}
.order-icon {
  position: relative;
  top: -24px;
}
</style>
