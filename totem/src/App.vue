<template>
  <v-app>
    <v-toolbar color="#ee3542" extended>
      <v-img class="logo" :src="logo"></v-img>
    </v-toolbar>
    <router-view v-if="totemActive" />
    <v-container class="container" v-if="!totemActive">
      <v-carousel
        hide-delimiters
        hide-controls
        inverse
        touchless
        height="100vw"
        :interval="interval"
      >
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.image">
          <div class="carousel-category-name">{{item.category.name}}</div>
        </v-carousel-item>
      </v-carousel>
      <v-divider></v-divider>
      <v-sheet class="d-flex" color="#ee3542" height="424">
        <sheet-footer>
          <div class="footer-message">
            <p>😢</p>
            <p>El totem se encuentra momentáneamente fuera de servicio.</p>
            <p>Pedimos discuplas por las molestias.</p>
          </div>
        </sheet-footer>
      </v-sheet>
    </v-container>
    <Loading />
  </v-app>
</template>
<script>
import store from "@/store";
import Loading from "@/components/Loading";
const Logo = require("@/assets/logo big fondo rojo.png");
import { intervals } from "@/config";

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
      if (!this.products.length) {
        store.dispatch("loadProducts");
      }
    },
    products() {
      const items = [];
      this.products.map(item => {
        switch (item.category_id) {
          case 1: // Carnes
          case 2: // Hamburguesas
          case 3: // Ensaladas
          case 6: // Kids
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
      items: [],
      interval: 10000
    };
  },
  mounted() {
    store.dispatch("checkTotemStatus");
    setInterval(() => {
      store.dispatch("checkTotemStatus");
    }, intervals.statusChange);
  }
};
</script>

<style>
body {
  font-family: Roboto;
}
.logo {
  top: 32px;
  max-width: 400px;
  height: 90px;
}
::-webkit-scrollbar {
  width: 0;
}
.carousel-category-name {
  font-size: 6em;
  font-weight: 900;
  color: #fff;
  text-shadow: 2px 4px 6px #000;
  text-align: center;
}
.d-flex {
  margin-top: 60px;
  box-shadow: 4px 4px 4px #999;
}
.footer-message {
  padding: 60px;
  font-size: 3em;
  color: #fff;
}
</style>
