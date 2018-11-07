<template>
  <v-card>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-divider :key="`div${index}`"></v-divider>
        <v-subheader :key="`sub${index}`">
          {{ item.name }}
        </v-subheader>
        <v-list-tile :key="`tile${index}`">
          <v-img :src="item.image" contain></v-img>
          <v-list-tile-content>
            <h3 v-html="`$ ${item.price}`"></h3>
          </v-list-tile-content>
        </v-list-tile>
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
  return {

  }
}
}
</script>
<style scoped>
.checkout {
  background: #fff;
}
</style>
