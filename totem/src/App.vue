<template>
  <v-app>
    <v-toolbar color="#ee3542" extended extension-height="77">
      <v-img class="logo" :src="logo" contain></v-img>
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
  top: 46px;
  max-width: 50%;
  left: 25%;
}
</style>
