<template>
  <div id="app">
    <router-link v-if="this.$root.$data.logged " tag="md-button" :to="{ name: 'Home' }" class="md-raised md-primary">Home</router-link>
    <router-link v-if="this.$root.$data.logged " tag="md-button" :to="{ name: 'Categories' }" class="md-raised md-accent">Categorías</router-link>
    <router-link v-if="this.$root.$data.logged " tag="md-button" :to="{ name: 'Products' }" class="md-raised md-accent">Productos</router-link>
    <router-link v-if="this.$root.$data.logged " tag="md-button" :to="{ name: 'Discounts' }" class="md-raised md-accent">Descuentos</router-link>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>

</style>

