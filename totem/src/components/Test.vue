<template>
  <v-container fluid class="test">
    <v-card>
      <v-card-title primary-title class="headline primary white--text">
        <v-btn fab @click.stop="back">
          <v-icon>close</v-icon>
        </v-btn>Tareas Especials
      </v-card-title>
      <v-alert v-show="showProcess" type="success">Comando ejecutado.</v-alert>
      <div v-if="!showGetPass">
        <v-card-text>
          <p class="headline">Totem</p>
          <!--
          <v-btn large color="success" @click.stop="activateTotem">Activar</v-btn>
          -->
          <v-btn large color="error" @click.stop="deactivateTotem">Desactivar</v-btn>
          <p></p>
          <p>Si lo desactivás en esta pantalla no se podrá volver a activar desde aquí.</p>
          <p>Para reactivarlo deberás usar la lectora de código de barras con la tarjeta correspondiente.</p>
        </v-card-text>
        <hr />
        <v-card-text>
          <p class="headline">posnet</p>
          <v-btn large color="primary" @click.stop="batchClose">Cerrar Lote</v-btn>
          <v-btn large color="error" @click.stop="cancelPay">Cancelar Pago</v-btn>
        </v-card-text>
        <hr />
        <v-card-text>
          <p class="headline">Fiscal</p>
          <v-btn large color="primary" @click.stop="closeX">Cierre X</v-btn>
          <v-btn large color="primary" @click.stop="closeZ">Cierre Z</v-btn>
        </v-card-text>
        <hr />
        <v-card-text>
          <p class="headline">Pruebas impresoras</p>
          <v-btn large @click.stop="printTotem">Ticket Totem</v-btn>
          <v-btn large @click.stop="printComanda">Ticket Comanda</v-btn>
          <v-btn large @click.stop="printFiscal">Ticket Fiscal</v-btn>
        </v-card-text>
      </div>
      <div v-if="showGetPass">
        <v-card-text>
          <v-form ref="form">
            <v-text-field type="password" autocomplete="off" v-model="pass" label="Ingrese clave"></v-text-field>
            <v-btn small color="error" @click.stop="checkPass">Confirmar</v-btn>
            <v-alert :value="passError" type="error">La clave es incorrecta, vuelva a intentar.</v-alert>
          </v-form>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Test",
  store,
  props: {
    hideTest: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      showGetPass: false,
      pass: "",
      passError: false,
      showProcess: false
    };
  },
  computed: {
    order() {
      return store.getters.testOrderData;
    }
  },
  methods: {
    printTotem() {
      this.showProcess = false;
      const order = { ...this.order, printerId: 1 };
      store.dispatch("printOrderThermal", order);
      this.notifyAlert();
    },
    printComanda() {
      this.showProcess = false;
      const order = { ...this.order, printerId: 2 };
      store.dispatch("printOrderThermal", order);
      this.notifyAlert();
    },
    printFiscal() {
      this.showProcess = false;
      store.dispatch("printOrderFiscal", this.order);
      this.notifyAlert();
    },
    closeX() {
      this.curAction = "closeX";
      this.showGetPass = true;
    },
    closeZ() {
      this.curAction = "closeZ";
      this.showGetPass = true;
    },
    cancelPay() {
      this.curAction = "cancelPay";
      this.showGetPass = true;
    },
    activateTotem() {
      this.curAction = "activateTotem";
      this.showGetPass = true;
    },
    deactivateTotem() {
      this.curAction = "deactivateTotem";
      this.showGetPass = true;
    },
    batchClose() {
      this.curAction = "batchClose";
      this.showGetPass = true;
    },
    back() {
      this.hideTest();
    },
    getSecurityCode() {
      const date = new Date();
      const code =
        (date.getFullYear() * (date.getMonth() + 1)) / date.getDate();
      return parseInt(code);
    },
    checkPass() {
      if (parseInt(this.pass) !== this.getSecurityCode()) {
        this.passError = true;
        return;
      }
      this.passError = false;
      this.showGetPass = false;
      this.showProcess = false;
      switch (this.curAction) {
        case "closeX":
          store.dispatch("printReportX");
          break;
        case "closeZ":
          store.dispatch("printReportZ");
          break;
        case "batchClose":
          store.dispatch("batchClose");
          break;
        case "cancelPay":
          store.dispatch("cancelPayment");
          break;
        case "activateTotem":
          store.dispatch("activateTotem");
          break;
        case "deactivateTotem":
          store.dispatch("deactivateTotem");
          break;
      }
      this.notifyAlert();
    },
    notifyAlert() {
      this.showProcess = true;
      setTimeout(() => {
        this.showProcess = false;
        this.pass = "";
      }, 2000);
    }
  },
  mounted() {
    store.dispatch("loadTestOrderData", 1);
  }
};
</script>
