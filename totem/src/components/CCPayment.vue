<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent transition="scale-transition" width="500">
      <v-card height="400">
        <v-card-title primary-title class="headline error white--text">💳 Pagando con tarjeta</v-card-title>
        <v-card-text class="headline">
          <pre class="message">{{message}}</pre>
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            color="primary"
            v-show="showStart"
            @click.stop="doStart()"
          >{{processButtonMessage}}</v-btn>
          <v-spacer></v-spacer>
          <v-btn large color="error" @click.stop="doCancel()">{{cancelcancelButtonMessage}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/*
"ResultCode": -1,
"ResultMessage": "The request was accepted by the device.",

"ResultCode":2055,
"ResultMessage":"No response from the device.",

"ResultCode":1011,
"ResultMessage":"The device required to be use is not present. Use another one.",

"ResultCode": 2104,
"ResultMessage": "CANCELADO",

"InternalCode": "2053",
"Description": "Device response is impossible to be read. We tried to do it many times.",

"InternalCode": "2054",
"Description": "Device request was not received by device succesfully. We tried to do it many times.",

"InternalCode": "2055",
"Description": "No response from the device.",

"InternalCode": "1004",
"Description": "Max time lapse to process the incomming request was reached. Please, try again faster!",

C01;100;TRANSACCION NO PERMITIDA
C02;100;TARJETA VENCIDA
C03;100;POR FAVOR UTILIZE TARJETA CON CONTACTO
C04;100;TARJETA INVALIDA
C05;100;PRODUCTO NO ENCONTRADO
C06;100;ERROR AL LEER LA TARJETA
C07;100;PRODUCTO NO ENCONTRADO
C08;100;PRODUCTO NO ENCONTRADO
C09;100;PRODUCTO NO ENCONTRADO
P01;01;ERROR LECTURA
P02;02;CANCELADO
P03;100;OPERACION CANCELADA
P04;100;TRANSACCION NO EXISTE
P05;100;MONTO EXCEDIDO
P06;100;TRANSACCION INVALIDA
P07;100;NO ES TARJ.SOLICIT
P08;100;TIPO DE SOLICITUD NO ES IGUAL RECIBIDO EN GETCARD
P09;100;TARJETA CON CHIP
P10;100;ERROR DE COMUNICACION
P11;100;RESULT. INFORMADO
P12;100;IMPRESORA SIN PAPEL

ContractVersion: "2.2.0"
DeviceIntegratorVersion: "3.0.1"
DeviceType: "TerminalFirstDataVx690Integrated"
HostResultCode: 5
HostResultMessage: "Denegada"
LastContractVersionAvailable: "3.0.0"
ResponseActions: "Refuse"
ResultCode: -1
ResultMessage: "The request was accepted by the device."
Session: 17
TerminalIdentification: "39563011"
TransactionResponseType: "Buy"
WorkstationInfo: "Windows_NT;win32;10.0.18362;x64;TOTEM01;v6.11.5;4984"
*/

/*TODO Anulacion y cierre de lote deste totem */

import store from "@/store";
import {
  activateCCReader,
  sendBuyRequest,
  confirmTransaction,
  getLastTransaction
} from "@/external";

import { savePayment } from "@/services";

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
      processButtonMessage: "",
      cancelcancelButtonMessage: "",
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
    },
    ccError() {
      return store.getters.ccError;
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
          this.processButtonMessage = "Comenzar";
          this.cancelcancelButtonMessage = "Cancelar";
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
              this.saveResponse(resp, "GetCard");
              if (resp.data.ResponseActions !== "Approve") {
                store.dispatch("setCCError", resp.data);
                return store.dispatch("setCCStatus", 4);
              }
              store.dispatch("ccSaveResponse", resp);
              const { total_price, order_number, createdAt } = this.ccOrder;
              sendBuyRequest(
                total_price,
                createdAt
                  .substring(0, 10)
                  .split("-")
                  .join("/"),
                order_number
              )
                .then(resp => this.paymentAccepted(resp))
                .catch(err => {
                  getLastTransaction()
                    .then(resp => {
                      this.saveResponse(resp, "getLastTransaction");
                      this.paymentAccepted(resp);
                    })
                    .catch(err => {
                      store.dispatch("setCCError", err);
                      store.dispatch("setCCStatus", 4);
                    });
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
          this.cancelButtonMessage = "Cerrar";
          setTimeout(() => {
            store.dispatch("setCCStatus", 3);
          }, 10000);
          break;
        case 3:
          this.dialog = false;
          break;
        case 4:
          this.showStart = true;
          this.processButtonMessage = "Reintentar";
          const errorCode =
            this.ccError.ResultCode && this.ccError.ResultCode !== -1
              ? `Error # ${this.ccError.ResultCode}`
              : null;
          this.message = `Lo sentimos!!!

Ha ocurrido un error intentando procesar su pago 😧

${errorCode}`;
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
    },
    saveResponse(resp, action) {
      const data = {
        orderId: this.ccOrder.id,
        response: JSON.stringify({ ...resp.data, action })
      };
      savePayment(data);
    },
    paymentAccepted(resp) {
      this.saveResponse(resp, "Buy");
      if (resp.data.ResponseActions !== "Approve") {
        store.dispatch("setCCStatus", 4);
        return confirmTransaction();
      }
      store.dispatch("ccSaveResponse", resp);
      confirmTransaction()
        .then(resp => {
          this.saveResponse(resp, "ConfirmTransaction");
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
    }
  }
};
</script>
<style scoped>
.message {
  height: 240px;
  text-align: center;
  font-size: 0.8em;
  font-family: Roboto;
}
</style>
