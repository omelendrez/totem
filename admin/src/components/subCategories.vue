<template>
  <div class="subCategories">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Sub-Categorías</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Lista de Sub-Categorías</h1>
        </md-toolbar>

        <md-table @sort="onSort" md-sort="name">
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="name">Nombre</md-table-head>
              <md-table-head>Status</md-table-head>

              <md-table-head class="button_header">Ver</md-table-head>
              <md-table-head class="button_header">Editar</md-table-head>
              <md-table-head class="button_header">Borrar</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in subCategories" :key="rowIndex" :md-item="row">
              <md-table-cell>{{row.name}}</md-table-cell>
              <md-table-cell>{{row.status.name}}</md-table-cell>

              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="viewSubCategory(row.id)">
                  <md-icon>find_in_page</md-icon>
                </md-button>
              </md-table-cell>

              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="editSubCategory(row.id)">
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
        <md-table-pagination md-size="5" v-bind:md-total="totalRows" md-page="0" md-label="Registros" md-separator="de" :md-page-options="[5, 10, 25, 50]" @pagination="onPagination"></md-table-pagination>

      </md-table-card>

    </md-layout>

    <md-button class="md-fab md-primary md-fab-bottom-right" v-on:click.native="addSubCategory()">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog-confirm :md-title="confirm.title" :md-content="confirm.content" :md-ok-text="confirm.ok" :md-cancel-text="confirm.cancel" @close="onClose" ref="confirmDelete">
    </md-dialog-confirm>
  </div>
</template>

<script>
import HTTP from "./http-common";

export default {
  name: "subCategories",
  data() {
    return {
      subCategories: [],
      confirm: {
        title: "",
        content: "Realmente desea eliminar la categoría seleccionada?",
        ok: "Si",
        cancel: "No"
      },
      sort: {
        name: "name",
        type: "asc"
      },
      pag: {
        size: 5,
        page: 1
      },
      totalRows: 0
    };
  },
  methods: {
    fetchSubCategories() {
      HTTP.get(
        `sub_categories?page=${this.pag.page}&size=${this.pag.size}&sort=${this
          .sort.name}&type=${this.sort.type}`
      )
        .then(res => {
          this.subCategories = res.data.rows;
          this.totalRows = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addSubCategory() {
      this.$router.push({ name: "SubCategoryAdd" });
    },
    editSubCategory(id) {
      this.$router.push({ name: "SubCategoryEdit", params: { id } });
    },
    viewSubCategory(id) {
      this.$router.push({ name: "SubCategoryView", params: { id } });
    },
    deleteSubCategory(id) {
      HTTP.delete(`sub_categories/${id}`)
        .then(res => {
          console.log(res.data);
          this.fetchSubCategories();
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
        this.deleteSubCategory(this.record_id);
      }
    },
    onPagination(pag) {
      this.pag = pag;
      this.fetchSubCategories();
    },
    onSort(sort) {
      this.sort = sort;
      this.fetchSubCategories();
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.$root.$data.last_call = "subCategories";
    this.fetchSubCategories();
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
