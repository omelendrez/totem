<template>
  <div id="app">
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Home' }" class="md-raised md-primary">Home</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Categories' }" class="md-raised md-accent">Categorías</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Products' }" class="md-raised md-accent">Productos</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Discounts' }" class="md-raised md-accent">Descuentos</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Users' }" class="md-raised md-accent">Usuarios</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Reports' }" class="md-raised md-accent">Reportes</router-link>

    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Login' }" class="md-raised md-default float-right logout-button">Logout</router-link>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style scoped>
.float-right {
  float: right;
}

.logout-button {
  background-color: #ccc !important;
}
</style>

