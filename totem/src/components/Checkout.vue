<template>
  <v-card class="checkout">
    <v-list class="checkout__list" three-line>
      <h1>Tu compra</h1>
      <template v-for="(item, index) in items">
        <v-container :key="`c${index}`">
          <v-list-tile :key="`tile${index}`">
            <v-img :src="item.image" class="image" cover></v-img>
            <v-list-tile-content class="item-content">
              <h4>{{ item.ticket_text }}</h4>
              <h4 v-html="`${item.quantity} X $ ${item.price.replace('.00','')}`"></h4>
              <h3 v-html="`Total: $ ${item.totalPrice.replace('.00','')}`"></h3>
              <v-btn dark small fab absolute center right color="pink" @click="remove(item)">
                <v-icon>remove</v-icon>
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-container>
      </template>
      <v-divider></v-divider>
      <div class="total">
        <h3 class="amount">Total $ {{total}}</h3>
      </div>
      <div class="buttons">
        <v-btn large round color="primary" v-if="ccAllowed" @click="cardPay">💳 Pagar con tarjeta</v-btn>
        <v-btn large round color="info" @click="cashPay">💰 Pagar en caja</v-btn>
        <v-btn large round color="secondary" dark @click="cancel">👎 Cancelar la orden</v-btn>
      </div>
      <Confirm
        :title="title"
        :message="message"
        :confirm="verifyCancel"
        :button-ok-msg="buttonOkMsg"
        :button-no-msg="buttonNoMsg"
      />
    </v-list>
  </v-card>
</template>

<script>
import Confirm from "@/components/Confirm";
export default {
  name: "Checkout",
  components: {
    Confirm
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: null
    },
    remove: {
      type: Function,
      default: undefined
    },
    payCash: {
      type: Function,
      default: undefined
    },
    payCc: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      title: "",
      message: "",
      buttonOkMsg: "",
      buttonNoMsg: "",
      ccAllowed: true
    };
  },
  methods: {
    cardPay() {
      this.payCc();
    },
    cashPay() {
      this.payCash();
    },
    cancel() {
      this.title = "Cancelar orden";
      this.message = "Estás seguro de que querés cancelar su orden? 😢";
      this.buttonOkMsg = "Si, cancelar";
      this.buttonNoMsg = "No";
    },
    verifyCancel(value) {
      this.message = "";
      if (!value) return;
      this.remove(-1);
    }
  }
};
</script>
<style scoped>
.checkout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.checkout__list {
  margin-top: 64px;
}
.checkout__list {
  width: 70vw;
}
.amount {
  text-align: center;
  font-size: 3em;
}
.item-content {
  margin-left: 20px;
  font-size: 1.3em;
}
.image {
  max-width: 180px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
button {
  font-size: 1.6em;
}
</style>
