<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent transition="scale-transition" width="500">
      <v-card height="400">
        <v-card-title primary-title class="headline error white--text">💳 Pagando con tarjeta</v-card-title>
        <v-card-text class="headline">
          <pre class="message">{{message}}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn absolute left large color="primary" v-show="showStart" @click="doStart()">Comenzar</v-btn>
          <v-btn absolute right large color="error" @click="doCancel()">{{buttonMessage}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import store from "@/store";
import { activateCCReader } from "@/external";
import { saveOrder, changeOrderStatus } from "@/services";

export default {
  name: "CCPayment",
  store,
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      showStart: true,
      message: "",
      buttonMessage: "",
      dialog: false
    };
  },
  computed: {
    ccStatus() {
      return store.getters.ccStatus;
    }
  },
  watch: {
    ccStatus() {
      const ccStatus = this.ccStatus;
      switch (ccStatus) {
        case 0:
          this.showStart = true;
          this.buttonMessage = "Cancelar";
          this.message = `Presione el botón Comenzar y luego pase su tarjeta
por el lector de tarjetas ubicado debajo de esta pantalla

... o presione Cancelar para elegir otro medio de pago`;
          this.dialog = true;
          break;
        case 1:
          this.showStart = false;
          this.message = "Procesando pago...";
          activateCCReader()
            .then(() => {
              const order = {
                statusId: 1,
                paymentMethod: 1,
                items: this.items
              };
              store.dispatch("saveOrder", order);
            })
            .catch(() => {
              store.dispatch("setCCStatus", 4);
            });
          break;
        case 2:
          this.message = "Pago completado con éxito 👍";
          this.buttonMessage = "Cerrar";
          setTimeout(() => {
            store.dispatch("setCCStatus", 3);
          }, 10000);
          break;
        case 3:
          this.dialog = false;
          break;
        case 4:
          this.showStart = true;
          this.message = `Lo sentimos!!!
Ha ocurrido un error intentando procesar su pago 😧
Presione Comenzar para intentar de nuevo
o Cancelar para elegir otro medio de pago`;
          break;
      }
    }
  },
  methods: {
    doStart() {
      store.dispatch("setCCStatus", 1);
    },
    doCancel() {
      store.dispatch("setCCStatus", 3);
    }
  }
};
</script>
<style scoped>
.message {
  text-align: center;
  font-size: 0.8em;
  font-family: Roboto;
  height: 240px;
}
.order-number {
  font-size: 3em;
  font-weight: bold;
}
</style>
