<template>
  <v-card class="checkout">
    <v-list class="checkout__list">
    <h1>Tu compra</h1>
      <template v-for="(item, index) in items">
        <v-container :key="`c${index}`">
          <v-divider :key="`div${index}`"></v-divider>
            <h4>{{ item.name }}</h4>
          <v-list-tile :key="`tile${index}`">
            <v-img :src="item.image" height="48px" contain></v-img>
            <v-list-tile-content>
              <h3 v-html="`$ ${item.price}`"></h3>
                  <v-btn dark small fab absolute bottom right color="pink" @click="remove(index)">
                    <v-icon>remove</v-icon>
                  </v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-container>
      </template>
      <v-divider></v-divider>
      <div class="total">
        <h3 class="amount">
          Total $ {{total}}
        </h3>
      </div>
      <v-btn large dark block color="pink" :loading="CCloading" @click="CCloading=true">Pagar con tarjeta</v-btn>
      <v-btn large dark block color="primary" :loading="CashLoading" @click="CashLoading=true">Pagar en caja</v-btn>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "Checkout",
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
      CCloading: false,
      CashLoading: false
    };
  }
};
</script>
<style scoped>
.checkout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.checkout__list {
  width: 30%;
}
.amount {
  text-align: center;
  font-size: 2em;
}
</style>
