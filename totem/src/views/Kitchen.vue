<template>
  <v-container fluid class="kitchen" @click="setFocus">
    <h1>Cocina</h1>
    <v-text-field
      ref="inputField"
      class="input-field"
      v-model="value"
      label="Item #"
      @change="sendItem"
    ></v-text-field>
    <v-data-table hide-actions :headers="headers" :items="items" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>
          <h1>{{ props.item.id }}</h1>
        </td>
        <td>
          <h1>{{ props.item.order.order_number }}</h1>
        </td>
        <td>
          <h1>{{ props.item.product_name }}</h1>
        </td>
        <td class="text-xs-center">
          <h1>{{ props.item.quantity }}</h1>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from "@/store";
import { interval } from "@/utils";
export default {
  name: "Kitchen",
  store,
  computed: {
    items() {
      return store.getters.items;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Item #",
          value: "id",
          sortable: false
        },
        {
          text: "Orden #",
          value: "order_number",
          sortable: false
        },
        {
          text: "Producto",
          value: "product_name",
          sortable: false
        },
        {
          text: "Cantidad",
          value: "quantity",
          align: "center",
          sortable: false
        }
      ],
      value: ""
    };
  },
  mounted() {
    store.dispatch("loadItems");
    setInterval(() => {
      store.dispatch("loadItems");
    }, interval);
    this.$nextTick(() => this.$refs.inputField.focus());
  },
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    },
    sendItem() {
      const data = { itemId: this.value, statusId: 1 };
      store.dispatch("changeItemStatus", data);
      this.value = "";
    }
  }
};
</script>
<style scoped>
.kitchen {
}
.input-field {
  font-size: 2em;
  font-weight: bold;
}
</style>
