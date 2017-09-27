<template>
  <div class="productos">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Administrar Productos</h1>
      <router-link tag="md-button" :to="{ name: 'Home' }" class="md-raised md-default">Home</router-link>
    </md-toolbar>

    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Productos</h1>
        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-table md-sort="code" md-sort-type="asc" @select="onSelect" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="code">Código</md-table-head>
            <md-table-head md-sort-by="name">Nombre</md-table-head>
            <md-table-head md-numeric>Precio</md-table-head>
            <md-table-head>Categoría</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in products" :key="rowIndex" :md-item="row" md-auto-select md-selection>
            <md-table-cell>{{row.code}}</md-table-cell>
            <md-table-cell>{{row.name}}</md-table-cell>
            <md-table-cell md-numeric>{{row.price}}</md-table-cell>
            <md-table-cell>{{row.category_id}}</md-table-cell>
            <md-table-cell>{{row.status}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>

      <md-table-pagination md-size="5" md-total="10" md-page="1" md-label="Rows" md-separator="of" :md-page-options="[5, 10, 25, 50]" @pagination="onPagination"></md-table-pagination>
    </md-table-card>
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
          this.products = res.body;
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
