<template>
  <v-container fluid class="test">
    <v-card>
      <v-card-title primary-title class="headline primary white--text">
        <v-btn fab @click.stop="back">
          <v-icon>close</v-icon>
        </v-btn>Test de impresoras del totem
      </v-card-title>
      <v-card-text class="headline" v-if="logged">
        <p>Haga click en los botones de abajo para imprimir un ticket de prueba en la impresora deseada</p>
        <v-spacer></v-spacer>
        <v-btn large color="success" @click.stop="printTotem">Ticket Totem</v-btn>
        <v-btn large color="success" @click.stop="printComanda">Ticket Comanda</v-btn>
        <v-btn large color="success" @click.stop="printFiscal">Ticket Fiscal</v-btn>
      </v-card-text>
      <v-card-text v-else>
        <v-form ref="form">
          <v-text-field
            type="password"
            autocomplete="off"
            v-model="pass"
            label="Ingrese contraseña"
          ></v-text-field>
        </v-form>
      </v-card-text>
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
      logged: true,
      pass: ""
    };
  },
  watch: {
    pass() {
      this.logged = this.pass === "140814";
    }
  },
  computed: {
    order() {
      return store.getters.testOrderData;
    }
  },
  methods: {
    printTotem() {
      const order = { ...this.order, printerId: 1 };
      store.dispatch("printOrderThermal", order);
    },
    printComanda() {
      const order = { ...this.order, printerId: 2 };
      store.dispatch("printOrderThermal", order);
    },
    pintFiscal() {
      store.dispatch("printOrderFiscal", this.order);
    },
    back() {
      this.hideTest();
    }
  },
  mounted() {
    store.dispatch("loadTestOrderData", 1);
  }
};
</script>
