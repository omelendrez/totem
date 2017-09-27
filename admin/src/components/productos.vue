<template>
  <div class="productos">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Administrar Productos</h1>
      <router-link tag="md-button" :to="{ name: 'Home' }" class="md-raised md-default">Home</router-link>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'products',
  data() {
    return {
      products: []
    };
  },
  methods: {
    fetchProducts() {
      this.$http.get('http://localhost:3000/products')
        .then((res) => {
          console.log(res.body);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
