<template>
  <v-container fluid @click="setFocus">
    <h1>Mostrador</h1>
    <v-text-field
      ref="inputField"
      class="input-field"
      v-model="value"
      label="Orden #"
      @change="sendItem"
    ></v-text-field>
    <v-container fluid grid-list-lg class="counter">
      <v-layout row wrap>
        <v-flex d-flex v-for="(order, index) in orderItems" :key="index" class="order-card">
          <v-card>
            <v-card-text primary-title>
              <div class="order">{{order.order_number}}</div>
              <div v-for="(item, index2) in order.order_items" :key="index2">
                <div class="item">
                  <span class="product-icon">
                    <v-icon>{{getStatus(item.status_id)}}</v-icon>
                  </span>
                  <span class="quantity">{{item.quantity}}</span>
                  <span class="product-name">{{item.product_name}}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Counter",
  store,
  data() {
    return {
      value: ""
    };
  },
  computed: {
    orderItems() {
      return store.getters.orderItems;
    }
  },
  mounted() {
    store.dispatch("loadOrderItems");
    setInterval(() => {
      store.dispatch("loadOrderItems");
    }, interval);
    this.$nextTick(() => this.$refs.inputField.focus());
  },
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    },
    sendItem() {
      const data = { orderId: this.value, statusId: 2 };
      store.dispatch("changeOrderStatus", data);
      this.value = "";
    },
    getStatus(status_id) {
      return status_id === 1 ? "thumb_up" : "remove";
    }
  }
};
</script>
<style scoped>
.counter {
  background-color: #ee3542;
}
.input-field {
  font-size: 2em;
  font-weight: bold;
}
.order-card {
  max-width: 320px;
}
.order {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}
.item {
  font-size: 1.1em;
}
.quantity {
}
.product-icon {
  margin-right: 4px;
  width: 24px;
}
.product-name {
  margin-left: 4px;
  overflow: hidden;
}
</style>
