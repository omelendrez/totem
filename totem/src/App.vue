<template>
  <v-app>
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
</style>
