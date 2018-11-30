<template>
  <v-card class="checkout">
    <v-list class="checkout__list" three-line>
      <h1>Tu compra</h1>
      <template v-for="(item, index) in items">
        <v-container :key="`c${index}`">
          <v-divider :key="`div${index}`"></v-divider>
          <v-list-tile :key="`tile${index}`">
            <v-img :src="item.image" class="image" cover></v-img>
            <v-list-tile-content class="item-content">
              <h4>{{ item.name }}</h4>
              <h4 v-html="`${item.quantity} X $ ${item.price.replace('.00','')}`"></h4>
              <h3 v-html="`Total: $ ${item.totalPrice.replace('.00','')}`"></h3>
              <v-btn dark small fab absolute bottom right color="pink" @click="remove(item)">
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
      <v-btn large round block color="success" @click="cardPay">Pagar con tarjeta</v-btn>
      <v-btn large round block color="primary" @click="cashPay">Pagar en caja</v-btn>
      <v-btn large round block color="error" @click="cancel">Cancelar la orden</v-btn>
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
    }
  },
  data() {
    return {
      title: "",
      message: "",
      buttonOkMsg: "",
      buttonNoMsg: ""
    };
  },
  methods: {
    cardPay() {},
    cashPay() {},
    cancel() {
      this.title = "Cancelar orden";
      this.message = "Estás seguro de que querés cancelar la orden?";
      this.buttonOkMsg = "Si, cancelar";
      this.buttonNoMsg = "No";
    },
    verifyCancel(value) {
      setTimeout(() => {
        this.message = "";
        if (!value) return;
        this.remove(-1);
      }, 200);
    }
  }
};
</script>
<style scoped>
.checkout {
  display: flex;
  justify-content: center;
}
.checkout__list {
  width: 70vw;
}
.amount {
  text-align: center;
  font-size: 2em;
}
.item-content {
  margin-left: 20px;
}
.image {
  margin-top: 20px;
  max-width: 100px;
}
</style>
