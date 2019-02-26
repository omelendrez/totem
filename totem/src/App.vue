<template>
  <v-app>
    <v-toolbar color="#ee3542" extended>
      <v-img class="logo" :src="logo"></v-img>
    </v-toolbar>
    <router-view/>
    <Loading/>
  </v-app>
</template>
<script>
import Loading from "@/components/Loading";
const Logo = require("@/assets/logo big fondo rojo.png");
export default {
  name: "app",
  components: {
    Loading
  },
  data() {
    return {
      logo: Logo
    };
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
