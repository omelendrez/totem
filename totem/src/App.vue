<template>
  <v-app>
    <v-toolbar color="#ee3542" extended>
      <v-img class="logo" :src="logo"></v-img>
    </v-toolbar>
    <router-view v-show="totemActive"/>
    <v-container fluid class="image" v-show="!totemActive">
      <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.image"></v-carousel-item>
      </v-carousel>
    </v-container>
    <Loading/>
  </v-app>
</template>
<script>
import store from "@/store";
import Loading from "@/components/Loading";
const Logo = require("@/assets/logo big fondo rojo.png");
export default {
  name: "app",
  store,
  components: {
    Loading
  },
  computed: {
    totem() {
      return store.getters.totem;
    },
    products() {
      return store.getters.products;
    }
  },
  watch: {
    totem() {
      this.totemActive = this.totem.status_id === 1;
    },
    products() {
      const items = [];
      this.products.map(item => {
        switch (item.category_id) {
          case 1:
          case 2:
          case 3:
            items.push(item);
            break;
        }
      });
      this.items = items;
    }
  },
  data() {
    return {
      logo: Logo,
      totemActive: true,
      items: []
    };
  },
  mounted() {
    store.dispatch("checkTotemStatus");
  }
};
</script>

<style>
body {
  font-family: Roboto;
}
::-webkit-scrollbar {
  width: 0;
}
.logo {
  top: 32px;
  max-width: 400px;
  height: 90px;
}
</style>
