<template>
  <v-container fluid>
    <video width="1080" height="1920" autoplay loop>
      <source src="../assets/intro.mp4" type="video/mp4" />
    </video>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.container {
  padding: 0;
}
</style>