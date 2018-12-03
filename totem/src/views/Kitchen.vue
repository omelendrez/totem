<template>
  <v-container fluid class="kitchen" @click="setFocus">
    <v-text-field ref="inputField" class="input-field" label="ID"></v-text-field>
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
          text: "ID",
          value: "id",
          sortable: false
        },
        {
          text: "Orden",
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
      ]
    };
  },
  mounted() {
    store.dispatch("loadItems");
    setInterval(() => {
      store.dispatch("loadItems");
    }, 20000);
    this.$nextTick(() => this.$refs.inputField.focus());
  },
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    }
  }
};
</script>
<style scoped>
.kitchen {
  margin-top: 50px;
}
.input-field {
  font-size: 2em;
}
</style>
