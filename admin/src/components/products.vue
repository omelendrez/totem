<template>
  <div class="products">
    <md-toolbar class="md-primary">
      <span class="md-title">Productos</span>
    </md-toolbar>

    <md-layout md-align="center" v-if="showTable">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Lista de Productos</h1>

          <input class="md-input" v-model="filter" id="search_field" @keyup="search">
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>

        <md-table @sort="onSort" md-sort="code">
          <md-table-header>
            <md-table-row>
              <md-table-head>Imagen</md-table-head>
              <md-table-head md-sort-by="name">Producto</md-table-head>
              <md-table-head md-sort-by="price">
                <md-icon>attach_money</md-icon>
              </md-table-head>
              <md-table-head>Categoría</md-table-head>
              <md-table-head md-sort-by="status_id">Status</md-table-head>
              <md-table-head class="button_header">Ver</md-table-head>
              <md-table-head class="button_header">Editar</md-table-head>
              <md-table-head class="button_header">Borrar</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in products" :key="rowIndex" :md-item="row">
              <md-table-cell>
                <md-image height="60px" :md-src="`${backendURL.images}${row.image}`"></md-image>
              </md-table-cell>
              <md-table-cell>{{row.name}}</md-table-cell>
              <md-table-cell>{{row.price}}</md-table-cell>
              <md-table-cell>{{row.category.name}}</md-table-cell>
              <md-table-cell>{{row.status.name}}</md-table-cell>
              <md-table-cell>
                <md-button
                  class="md-icon-button md-default md-raised"
                  v-on:click.native="viewProduct(row.id)"
                >
                  <md-icon>find_in_page</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button
                  class="md-icon-button md-default md-raised"
                  v-on:click.native="editProduct(row.id)"
                >
                  <md-icon>edit</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button
                  class="md-icon-button md-default md-raised"
                  v-on:click.native="openDialog('confirmDelete', row.id, row.name)"
                >
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
        <md-table-pagination
          md-size="5"
          v-bind:md-total="totalRows"
          md-page="1"
          md-label="Registros"
          md-separator="de"
          :md-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"
        ></md-table-pagination>
      </md-table-card>
    </md-layout>
    <md-button class="md-fab md-primary md-fab-bottom-right" v-on:click.native="addProduct()">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content="confirm.content"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @close="onClose"
      ref="confirmDelete"
    ></md-dialog-confirm>
  </div>
</template>

<script>
import HTTP from "@/components/http-common";
import backendURL from "@/config";

export default {
  name: "products",
  data() {
    return {
      showTable: false,
      products: [],
      backendURL,
      confirm: {
        title: "",
        content: "Realmente desea eliminar el producto seleccionado?",
        ok: "Si",
        cancel: "No"
      },
      sort: {
        name: "code",
        type: "asc"
      },
      pag: {
        size: 5,
        page: 1
      },
      totalRows: 0,
      filter: ""
    };
  },
  methods: {
    fetchProducts() {
      HTTP.get(
        `products?page=${this.pag.page}&size=${this.pag.size}&sort=${
          this.sort.name
        }&type=${this.sort.type}&filter=${this.filter}`
      )
        .then(res => {
          const { rows, count } = res.data;
          this.products = rows;
          this.totalRows = count;
          this.showTable = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      this.fetchProducts();
    },
    addProduct() {
      this.$router.push({ name: "ProductAdd" });
    },
    editProduct(id) {
      this.$router.push({ name: "ProductEdit", params: { id } });
    },
    viewProduct(id) {
      this.$router.push({ name: "ProductView", params: { id } });
    },
    deleteProduct(id) {
      HTTP.delete(`products/${id}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDialog(ref, id, name) {
      this.confirm.title = name;
      this.$refs[ref].open();
      this.record_id = id;
    },
    onClose(type) {
      if (type === "ok") {
        this.deleteProduct(this.record_id);
      }
    },
    onPagination(pag) {
      this.pag = pag;
      this.fetchProducts();
    },
    onSort(sort) {
      this.sort = sort;
      this.fetchProducts();
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.fetchProducts();
    this.$root.$data.last_call = "products";
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
  background-color: #e1e0b8;
}

.md-table-card .md-table-head {
  background-color: #f6f5d7;
}
</style>
