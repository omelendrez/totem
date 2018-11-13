<template>
  <v-card>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-container :key="`c${index}`">
        <v-divider :key="`div${index}`"></v-divider>
        <v-subheader :key="`sub${index}`">
          <h1>{{ item.name }}</h1>
        </v-subheader>
        <v-list-tile :key="`tile${index}`">
          <v-img :src="item.image" contain height="64px"></v-img>
          <v-list-tile-content>
            <h2 v-html="`$ ${item.price}`"></h2>
          </v-list-tile-content>
        </v-list-tile>
        </v-container>
      </template>
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
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.checkout {
  background: #fff;
}
</style>
