<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent transition="scale-transition" width="500">
      <v-card height="400">
        <v-card-title primary-title class="headline error white--text">💳 Pagando con tarjeta</v-card-title>
        <v-card-text class="headline">
          <div class="message">{{message}}</div>
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

export default {
  name: "CCPayment",
  store,
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
          this.message =
            "Pase su tarjeta por el lector de tarjetas ubicado debajo de esta pantalla y presione el botón azul para Comenzar o Cancelar para elegir otro medio de pago";
          this.dialog = true;
          break;
        case 1:
          this.showStart = false;
          this.message = "Procesando pago...";
          activateCCReader()
            .then(result => store.dispatch("setCCStatus", 2))
            .catch(err => store.dispatch("setCCStatus", 4));
          break;
        case 2:
          store.dispatch("remove", -1);
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
            Ha ocurrido un error intentando procesar su pago 😧.
            Presione Comenzar para intentar de nuevo o Cancelar para salir`;
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
  height: 240px;
}
</style>
