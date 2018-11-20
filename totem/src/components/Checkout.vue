<template>
  <v-card class="checkout">
    <v-list class="checkout__list">
      <template v-for="(item, index) in items">
        <v-container :key="`c${index}`">
          <v-divider :key="`div${index}`"></v-divider>
            <h4>{{ item.name }}</h4>
          <v-list-tile :key="`tile${index}`">
            <v-img :src="item.image" contain height="48px"></v-img>
            <v-list-tile-content>
              <h3 v-html="`$ ${item.price}`"></h3>
            </v-list-tile-content>
          </v-list-tile>
        </v-container>
      </template>
      <v-divider></v-divider>
      <h3>
        Total a pagar
        <span class="amount">
          $ {{total}}
        </span>
      </h3>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'Checkout',
  props: {
    items: {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.checkout {
  display: flex;
  justify-content: center;
}
.checkout__list {
  min-width: 600px;
}
.amount {
  font-size: 2em;
}
</style>
