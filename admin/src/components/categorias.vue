<template>
  <div class="categorias">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Categorías</h1>
      <router-link tag="md-button" :to="{ name: 'Home' }" class="md-raised md-default">Home</router-link>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Categorias',
  data() {
    return {
      msg: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
