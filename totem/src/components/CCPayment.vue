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
          <v-btn
            absolute
            left
            large
            color="primary"
            v-show="showStart"
            @click.stop="doStart()"
          >Comenzar</v-btn>
          <v-btn absolute right large color="error" @click.stop="doCancel()">{{buttonMessage}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// {"ResultCode":2055,"ResultMessage":"No response from the device.","ResponseActions":"Refuse","DeviceType":"TerminalFirstDataVx690Integrated","DeviceIntegratorVersion":"2.4.0","WorkstationInfo":"Windows_NT;win32;10.0.17763;x64;totem01;v6.11.5;3876","LastContractVersionAvailable":"2.2.0","ContractVersion":"2.2.0"}

import store from "@/store";
import {
  activateCCReader,
  sendBuyRequest,
  confirmTransaction,
  getLastTransaction
} from "@/external";

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
    },
    ccOrder() {
      return store.getters.ccOrder;
    },
    ccOrderData() {
      return store.getters.ccOrderData;
    },
    printingOrder() {
      return store.getters.printingOrder;
    }
  },
  watch: {
    ccOrder() {
      if (this.ccOrder && this.ccOrder.id) {
        store.dispatch("ccLoadOrderData", this.ccOrder.id);
      }
    },
    ccStatus() {
      const ccStatus = this.ccStatus;
      switch (ccStatus) {
        case 0:
          this.showStart = true;
          this.buttonMessage = "Cancelar";
          this.message = `Presione el botón Comenzar

... o presione Cancelar para elegir otro medio de pago`;
          this.dialog = true;
          const order = {
            statusId: 0,
            paymentMethod: 1,
            items: this.items
          };
          store.dispatch("ccSaveOrder", order);
          break;
        case 1:
          this.showStart = false;
          this.message = `Pase su tarjeta por el lector de tarjetas
ubicado debajo de esta pantalla`;
          store.dispatch("setCCError", {});
          activateCCReader()
            .then(resp => {
              store.dispatch("ccSaveResponse", resp);
              if (resp.ResponseActions === "Refuse") {
                store.dispatch("setCCStatus", 4);
                return;
              }
              const { total_price, order_number, createdAt } = this.ccOrder;
              sendBuyRequest(
                total_price,
                createdAt
                  .substring(0, 10)
                  .split("-")
                  .join("/"),
                order_number
              )
                .then(resp => {
                  if (resp.ResponseActions === "Refuse") {
                    store.dispatch("setCCStatus", 4);
                    return;
                  }
                  store.dispatch("ccSaveResponse", resp);
                  confirmTransaction()
                    .then(resp => {
                      const order = this.ccOrderData;

                      store.dispatch("ccSaveResponse", resp);
                      store.dispatch("ccChangeOrderStatus", order);

                      order.printerId = 1; // Totem ticket printer
                      store.dispatch("printOrderThermal", order);

                      order.printerId = 2; // Command printer
                      store.dispatch("printOrderThermal", order);

                      order.printerId = 3; // Fiscal printer
                      store.dispatch("printOrderFiscal", order);

                      store.dispatch("setCCStatus", 2);
                    })
                    .catch(err => {
                      store.dispatch("setCCError", err);
                      store.dispatch("setCCStatus", 4);
                    });
                })
                .catch(err => {
                  store.dispatch("setCCError", err);
                  store.dispatch("setCCStatus", 4);
                });
            })
            .catch(err => {
              store.dispatch("setCCError", err);
              store.dispatch("setCCStatus", 4);
            });
          break;
        case 2:
          this.message = `Pago completado con éxito 👍
Retire su ticket`;
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
    },
    printingOrder() {
      this.action = this.printingOrder
        ? `IMPRIMENDO TICKET # ${this.printingOrder} 💯`
        : "";
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
