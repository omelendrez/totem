<template>
  <v-app>
    <v-toolbar absolute color="primary" dark>
      <v-toolbar-title>Totem Big Six</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <router-view />
    <Loading />
  </v-app>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  name: "app",
  components: {
    Loading
  }
};
</script>

<style>
body {
  font-family: Roboto;
}

::-webkit-scrollbar {
  width: 0px;
}

</style>
