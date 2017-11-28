<template>
  <div id="app">
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Home' }" class="md-raised md-primary">Home</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Categories' }" class="md-raised md-accent">Categorías</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'SubCategories' }" class="md-raised md-accent">Sub-Categorías</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Products' }" class="md-raised md-accent">Productos</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Discounts' }" class="md-raised md-accent">Descuentos</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Reports' }" class="md-raised md-accent btn-reports">Reportes</router-link>

    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Login' }" class="md-raised md-default float-right logout-button">Logout</router-link>
    <router-link tag="md-button" v-if="this.$root.$data.logged" :to="{ name: 'Users' }" class="md-raised md-accent float-right">Usuarios</router-link>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
.float-right {
  float: right;
}

.btn-reports {
  margin-left: 10%;
}

.logout-button {
  background-color: #e1e0b8 !important;
}
</style>

