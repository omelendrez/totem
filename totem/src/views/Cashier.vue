<template>
  <v-container fluid class="cashier" @click="setFocus">
    <h1>Caja</h1>
    <v-text-field
      ref="inputField"
      class="input-field"
      v-model="value"
      label="Orden #"
      @change="sendItem"
    ></v-text-field>
    <v-data-table hide-actions :headers="headers" :items="orders" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>
          <h1>{{ props.item.order_number }}</h1>
        </td>
        <td class="text-xs-center">
          <h1>{{ props.item.total_price }}</h1>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Cashier",
  store,
  computed: {
    orders() {
      return store.getters.orders;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Orden #",
          value: "order_number",
          sortable: false
        },
        {
          text: "Total",
          align: "center",
          value: "total_price",
          sortable: false
        }
      ],
      value: ""
    };
  },
  mounted() {
    store.dispatch("loadOrders");
    setInterval(() => {
      store.dispatch("loadOrders");
    }, interval);
    this.$nextTick(() => this.$refs.inputField.focus());
  },
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    },
    sendItem() {
      const data = { orderId: this.value, statusId: 1 };
      store.dispatch("changeOrderStatus", data);
    }
  }
};
</script>
<style scoped>
.cashier {
}
.input-field {
  font-size: 2em;
  font-weight: bold;
}
</style>
