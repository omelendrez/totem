<template>
  <div class="products">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Administrar Productos</h1>
    </md-toolbar>

    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Productos</h1>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

      </md-toolbar>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="code">Código</md-table-head>
            <md-table-head md-sort-by="name">Nombre</md-table-head>
            <md-table-head>Descripción</md-table-head>
            <md-table-head md-numeric>Precio</md-table-head>
            <md-table-head>Categoría</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head class="button_header">Ver</md-table-head>
            <md-table-head class="button_header">Editar</md-table-head>
            <md-table-head class="button_header">Borrar</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in products" :key="rowIndex" :md-item="row">
            <md-table-cell>{{row.code}}</md-table-cell>
            <md-table-cell>{{row.name}}</md-table-cell>
            <md-table-cell>{{row.description}}</md-table-cell>
            <md-table-cell md-numeric>{{row.price}}</md-table-cell>
            <md-table-cell>{{row.category_id}}</md-table-cell>
            <md-table-cell>{{row.status}}</md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button md-default md-raised">
                <md-icon>find_in_page</md-icon>
              </md-button>
            </md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button md-default md-raised" v-on:click.native="editProduct(row.id)">
                <md-icon>edit</md-icon>
              </md-button>
            </md-table-cell>
            <md-table-cell>
              <md-button class="md-icon-button md-default md-raised" v-on:click.native="deleteProduct(row.id)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <md-button class="md-fab md-icon-button md-fab-bottom-right" v-on:click.native="addProduct()">
      <md-icon>add</md-icon>
    </md-button>
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
    },
    addProduct() {
      this.$router.push({ name: 'ProductAdd' });
    },
    editProduct(id) {
      this.$router.push({ name: 'ProductEdit', params: { id } });
    },
    deleteProduct(id) {
      this.$http.delete(`http://localhost:3000/products/${id}`)
        .then((res) => {
          console.log(res.body);
          this.fetchProducts();
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
.button_header {
  width: 20px;
}
</style>
