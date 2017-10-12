<template>
  <div class="products">

    <md-toolbar class="md-primary">
      <span class="md-title">Productos</span>
    </md-toolbar>

    <md-layout md-align="center">

      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Lista de Productos</h1>

          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>

        </md-toolbar>

        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="code">Código</md-table-head>
              <md-table-head md-sort-by="name">Nombre</md-table-head>
              <md-table-head>
                <md-icon>attach_money</md-icon>
              </md-table-head>
              <md-table-head>Categoría</md-table-head>
              <md-table-head>Sub-Categoría</md-table-head>
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
              <md-table-cell>{{row.price}}</md-table-cell>
              <md-table-cell>{{row.category.name}}</md-table-cell>
              <md-table-cell>{{row.sub_category.name}}</md-table-cell>
              <md-table-cell>{{row.status.name}}</md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="viewProduct(row.id)">
                  <md-icon>find_in_page</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="editProduct(row.id)">
                  <md-icon>edit</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="openDialog('confirmDelete', row.id, row.name)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>
    </md-layout>
    <md-button class="md-fab md-primary md-fab-bottom-right" v-on:click.native="addProduct()">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog-confirm :md-title="confirm.title" :md-content="confirm.content" :md-ok-text="confirm.ok" :md-cancel-text="confirm.cancel" @close="onClose" ref="confirmDelete">
    </md-dialog-confirm>

  </div>
</template>

<script>

import HTTP from './http-common';

export default {
  name: 'products',
  data() {
    return {
      products: [],
      confirm: {
        title: '',
        content: 'Realmente desea eliminar el producto seleccionado?',
        ok: 'Si',
        cancel: 'No'
      }
    };
  },
  methods: {
    fetchProducts() {
      HTTP.get('products')
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProduct() {
      this.$router.push({ name: 'ProductAdd' });
    },
    editProduct(id) {
      this.$router.push({ name: 'ProductEdit', params: { id } });
    },
    viewProduct(id) {
      this.$router.push({ name: 'ProductView', params: { id } });
    },
    deleteProduct(id) {
      HTTP.delete(`products/${id}`)
        .then((res) => {
          console.log(res.data);
          this.fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDialog(ref, id, name) {
      this.confirm.title = name;
      this.$refs[ref].open();
      this.record_id = id;
    },
    onClose(type) {
      if (type === 'ok') {
        this.deleteProduct(this.record_id);
      }
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }
    this.api_url = this.$root.$data.api_url;
    this.fetchProducts();
    this.$root.$data.last_call = 'products';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_header {
  width: 20px;
}

.md-table-card {
  margin-top: 18px;
}

.md-table-card .md-toolbar {
  background-color: #E1E0B8;
}

.md-table-card .md-table-head {
  background-color: #F6F5D7;
}
</style>
