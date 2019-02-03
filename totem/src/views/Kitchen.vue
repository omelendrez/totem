<template>
  <v-container fluid class="kitchen">
    <h1>Cocina</h1>
    <v-data-table hide-actions :headers="headers" :items="orderItems" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td v-bind:class="{'selected-item':(props.item.id === selectedId)}">
          <h1>{{ props.item.order.order_number }}</h1>
        </td>
        <td v-bind:class="{'selected-item':(props.item.id === selectedId)}">
          <h1>{{ props.item.product_name }}</h1>
        </td>
        <td class="text-xs-center" v-bind:class="{'selected-item':(props.item.id === selectedId)}">
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
  watch: {
    items() {
      this.orderItems = this.items;
      this.selectedId = this.orderItems[this.selectedItem].id;
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
      orderItems: [],
      selectedItem: 0,
      selectedId: 0
    };
  },
  created() {
    window.addEventListener("keydown", e => {
      if (e.code === "ArrowDown") {
        this.selectedItem < this.items.length - 1 && this.selectedItem++;
      }
      if (e.code === "ArrowUp") {
        this.selectedItem > 0 && this.selectedItem--;
      }
      if (e.code === "Enter") {
        this.sendItem();
      }
      console.log(this.selectedId, this.selectedItem);
      this.selectedId = this.items[this.selectedItem].id;
    });
  },
  mounted() {
    store.dispatch("loadItems");
    setInterval(() => {
      store.dispatch("loadItems");
    }, interval);
  },
  methods: {
    sendItem() {
      const data = { itemId: this.selectedId, statusId: 1 };
      store.dispatch("changeItemStatus", data);
    }
  }
};
</script>
<style scoped>
.kitchen {
  zoom: 1;
}
.input-field {
  font-size: 2em;
  font-weight: bold;
}
.selected-item {
  background-color: #ee3542;
  color: white;
}
</style>
