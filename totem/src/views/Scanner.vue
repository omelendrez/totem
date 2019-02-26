<template>
  <v-container fluid class="scanner" @click="setFocus">
    <h1>Scanner</h1>
    <v-text-field ref="inputField" class="input-field" v-model="value" @change="sendItem" autofocus></v-text-field>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Scanner",
  store,
  data() {
    return {
      value: ""
    };
  },
  computed: {
    changedOrder() {
      return store.getters.changedOrder;
    },
    orderData() {
      return store.getters.orderData;
    },
    printedOrder() {
      return store.getters.printedOrder;
    }
  },
  watch: {
    changedOrder() {
      const order = this.changedOrder;
      if (order.status_id === 1 && order.order_printed === 0) {
        store.dispatch("loadOrderData", order.id);
      }
    },
    orderData() {
      const order = this.orderData[0];
      order.printerId = 2;
      this.printOrder(order);
    },
    printedOrder() {
      store.dispatch("setOrderPrinted", this.printedOrder.order.id);
    }
  },
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    },
    sendItem() {
      const data = { orderId: this.value, statusId: 1, paymentMethod: 2 };
      store.dispatch("changeOrderStatus", data);
      this.value = "";
    },
    printOrder(order) {
      store.dispatch("printOrder", order);
    }
  }
};
</script>
<style scoped>
.input-field {
  font-size: 3em;
  font-weight: bold;
}
</style>
