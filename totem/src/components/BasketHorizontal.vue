<template>
  <v-container fluid class="basket" v-show="total>0">
    <v-toolbar color="info" dark>
      <v-icon class="amount">shopping_cart</v-icon>
      <span class="amount">$ {{total}}</span>
      <v-spacer></v-spacer>
      <v-btn large light round v-if="total>0" @click.stop="checkout=true">Revisar la orden 🛒</v-btn>
      <v-btn large light round v-if="total>0" @click.stop="cancel">Cancelar la orden 👎</v-btn>
    </v-toolbar>
    <v-layout row justify-center fill-height>
      <v-dialog v-model="checkout" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark fixed color="info">
          <v-btn icon dark @click.stop="checkout = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="back-button" light @click.stop="checkout = false">Volver</v-btn>
        </v-toolbar>
        <Checkout
          :items="items"
          :total="total"
          :remove="doRemove"
          :pay-cash="doPayCash"
          :pay-cc="doPayCC"
        />
      </v-dialog>
    </v-layout>
    <Confirm
      :title="title"
      :message="message"
      :confirm="verifyCancel"
      :button-ok-msg="buttonOkMsg"
      :button-no-msg="buttonNoMsg"
    />
    <Processing :message="action" />
    <CCPayment :items="items" />
  </v-container>
</template>

<script>
import store from "@/store";
import Checkout from "@/components/Checkout";
import Confirm from "@/components/Confirm";
import Processing from "@/components/Processing";
import CCPayment from "@/components/CCPayment";
export default {
  name: "Basket",
  store,
  components: {
    Checkout,
    Confirm,
    Processing,
    CCPayment
  },
  props: {
    basket: {
      type: Array,
      default: null
    },
    remove: {
      type: Function,
      default: undefined
    },
    add: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      items: [],
      total: 0,
      checkout: false,
      title: "",
      message: "",
      buttonOkMsg: "",
      buttonNoMsg: "",
      action: "",
      showCCPayment: false
    };
  },
  computed: {
    order() {
      return store.getters.order;
    },
    orderData() {
      return store.getters.orderData;
    },
    printingOrder() {
      return store.getters.printingOrder;
    }
  },
  watch: {
    basket() {
      let total = 0;
      const basket = this.basket.map(item => {
        item.quantity = 1;
        item.totalPrice =
          parseFloat(item.price) + parseFloat(item.additional).toString();
        total += parseFloat(item.price) + parseFloat(item.additional);
        return item;
      });
      this.items = basket;
      this.total = total;
      if (this.checkout) {
        this.checkout = this.items.length;
      }
    },
    order() {
      if (this.order && this.order.id) {
        store.dispatch("loadOrderData", this.order.id);
      }
    },
    orderData() {
      const order = this.orderData;
      if (order.payment_method === 2 && order.status_id === 0) {
        // CASHIER new order
        order.printerId = 1; // Totem ticket printer
        store.dispatch("printOrderThermal", order);
      }
    },
    printingOrder() {
      this.action = this.printingOrder
        ? `IMPRIMENDO TICKET # ${this.printingOrder} 💯`
        : "";
    }
  },
  methods: {
    doRemove({ id }) {
      const basketIndex = this.basket.findIndex(item => item.id === id);
      this.remove(basketIndex);
    },
    cancel() {
      this.title = "Cancelar orden";
      this.message = "Estás seguro de que querés cancelar la orden?";
      this.buttonOkMsg = "Si, cancelar";
      this.buttonNoMsg = "No";
    },
    verifyCancel(value) {
      this.message = "";
      if (!value) return;
      this.remove(-1);
    },
    doPayCash() {
      const order = {
        statusId: 0,
        paymentMethod: 2,
        items: this.items
      };
      store.dispatch("saveOrder", order);
    },
    doPayCC() {
      store.dispatch("setCCStatus", 0);
    }
  }
};
</script>
<style scoped>
.basket {
  padding: 0;
  min-width: 100%;
}
.amount {
  font-size: 3em;
  font-weight: bold;
}
button {
  font-size: 2em;
}
.back-button {
  font-size: 1.5em;
}
.totalPrice {
  text-transform: uppercase;
  font-weight: bold !important;
}
</style>
