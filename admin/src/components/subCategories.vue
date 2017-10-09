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

        <md-table>
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

import { mapGetters } from 'vuex';

export default {
  name: 'subCategories',
  data() {
    return {
      subCategories: [],
      confirm: {
        title: '',
        content: 'Realmente desea eliminar la categoría seleccionada?',
        ok: 'Si',
        cancel: 'No'
      },
      api_url: null
    };
  },
  computed: mapGetters({
    logged: 'logged'
  }),
  methods: {
    fetchSubCategories() {
      this.$http.get(`${this.api_url}sub_categories`)
        .then((res) => {
          this.subCategories = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    addSubCategory() {
      this.$router.push({ name: 'SubCategoryAdd' });
    },
    editSubCategory(id) {
      this.$router.push({ name: 'SubCategoryEdit', params: { id } });
    },
    viewSubCategory(id) {
      this.$router.push({ name: 'SubCategoryView', params: { id } });
    },
    deleteSubCategory(id) {
      this.$http.delete(`${this.api_url}sub_categories/${id}`)
        .then((res) => {
          console.log(res.body);
          this.fetchSubCategories();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    openDialog(ref, id, name) {
      this.confirm.title = name;
      this.$refs[ref].open();
      this.record_id = id;
    },
    onClose(type) {
      if (type === 'ok') {
        this.deleteSubCategory(this.record_id);
      }
    }
  },
  created() {
    console.log(this.logged.id);
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }
    this.api_url = this.$root.$data.api_url;
    this.$root.$data.last_call = 'subCategories';
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
  background-color: #E1E0B8;
}

.md-table-card .md-table-head {
  background-color: #F6F5D7;
}
</style>
