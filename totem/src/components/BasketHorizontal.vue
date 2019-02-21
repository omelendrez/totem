<template>
  <v-container fluid class="basket">
    <v-toolbar color="#ccc">
      <v-icon class="amount">shopping_cart</v-icon>
      <span class="amount">$ {{total}}</span>
      <v-spacer></v-spacer>
      <v-btn large color="success" round v-if="total>0" @click="checkout=true">Revisar la orden</v-btn>
      <v-btn large color="black" dark round v-if="total>0" @click="cancel">Cancelar la orden</v-btn>
    </v-toolbar>
    <v-layout row justify-center fill-height>
      <v-dialog v-model="checkout" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark fixed color="#ffc600">
          <v-btn icon dark @click="checkout = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn light @click="checkout = false">Volver</v-btn>
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
    <Processing :message="action"/>
  </v-container>
</template>

<script>
import store from "@/store";
import Checkout from "@/components/Checkout";
import Confirm from "@/components/Confirm";
import Processing from "@/components/Processing";
export default {
  name: "Basket",
  store,
  components: {
    Checkout,
    Confirm,
    Processing
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
      action: ""
    };
  },
  computed: {
    order() {
      return store.getters.order;
    }
  },
  watch: {
    basket() {
      let total = 0;
      const basket = [];
      this.basket.map(item => {
        let itm = item;
        itm.quantity = 1;
        itm.totalPrice = parseFloat(itm.price).toString();
        basket.push(itm);
        total += parseFloat(itm.price);
      });
      this.items = basket;
      this.total = total;
      if (this.checkout) {
        this.checkout = this.items.length;
      }
    },
    order() {
      setTimeout(() => {
        this.action = this.order
          ? `IMPRIMENDO TICKET # ${this.order.order_number}`
          : "";
        setTimeout(() => {
          this.action = "";
        }, 5000);
      }, 1000);
    }
  },
  methods: {
    doRemove(product) {
      const id = product.id;
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
      store.dispatch("saveOrder", this.items);
    },
    doPayCC() {
      console.log("cc");
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
.totalPrice {
  text-transform: uppercase;
  font-weight: bold !important;
}
</style>
