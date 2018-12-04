<template>
  <v-app>
    <v-toolbar color="#ee3542">
      <v-img :src="logo" contain height="48px"></v-img>
    </v-toolbar>
    <router-view/>
    <Loading/>
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
</style>
