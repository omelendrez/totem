<template>
  <v-container fluid class="scanner" @click="setFocus">
    <h1>Scanner</h1>
    <v-text-field
      ref="inputField"
      class="input-field"
      v-model="value"
      @change="sendItem"
      autofocus
    ></v-text-field>
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
  methods: {
    setFocus() {
      this.$refs.inputField.focus();
    },
    sendItem() {
      const data = { orderId: this.value, statusId: 1, paymentMethod: 2 };
      store.dispatch("changeOrderStatus", data);
      this.value = "";
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
