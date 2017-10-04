<template>
  <div class="reports">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Reportes</h1>
    </md-toolbar>

    <md-layout md-gutter md-align="center">
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'reports',
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
