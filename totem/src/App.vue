<template>
  <v-app>
    <v-toolbar absolute color="#ee3542" dark>
      <v-img :src="logo" contain height="56px"></v-img>
    </v-toolbar>
    <router-view />
    <Loading />
  </v-app>
</template>
<script>
import Loading from "@/components/Loading";
const Logo = require("@/assets/logo.png");
export default {
  name: "app",
  components: {
    Loading
  },
  data () {
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
</style>
