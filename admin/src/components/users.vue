<template>
  <div class="users">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Usuarios</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Lista de Usuarios</h1>

          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>

        </md-toolbar>

        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="code">Usuario</md-table-head>
              <md-table-head md-sort-by="name">Nombre</md-table-head>
              <md-table-head>Status</md-table-head>
              <md-table-head class="button_header">Ver</md-table-head>
              <md-table-head class="button_header">Editar</md-table-head>
              <md-table-head class="button_header">Borrar</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in users" :key="rowIndex" :md-item="row">
              <md-table-cell>{{row.user_name}}</md-table-cell>
              <md-table-cell>{{row.full_name}}</md-table-cell>
              <md-table-cell>{{row.status.name}}</md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="viewUser(row.id)">
                  <md-icon>find_in_page</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="editUser(row.id)">
                  <md-icon>edit</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button md-default md-raised" v-on:click.native="openDialog('confirmDelete', row.id, row.user_name)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>

    </md-layout>

    <md-button class="md-fab md-primary md-fab-bottom-right" v-on:click.native="addUser()">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog-confirm :md-title="confirm.title" :md-content="confirm.content" :md-ok-text="confirm.ok" :md-cancel-text="confirm.cancel" @close="onClose" ref="confirmDelete">
    </md-dialog-confirm>

  </div>
</template>

<script>

import HTTP from './http-common';

export default {
  name: 'users',
  data() {
    return {
      users: [],
      confirm: {
        title: '',
        content: 'Realmente desea eliminar el usuario seleccionado?',
        ok: 'Si',
        cancel: 'No'
      }
    };
  },
  methods: {
    fetchUsers() {
      HTTP.get('users')
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addUser() {
      this.$router.push({ name: 'UserAdd' });
    },
    editUser(id) {
      this.$router.push({ name: 'UserEdit', params: { id } });
    },
    viewUser(id) {
      this.$router.push({ name: 'UserView', params: { id } });
    },
    deleteUser(id) {
      HTTP.delete(`users/${id}`)
        .then(() => {
          this.fetchUsers();
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
        this.deleteUser(this.record_id);
      }
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }
    this.api_url = this.$root.$data.api_url;
    this.fetchUsers();
    this.$root.$data.last_call = 'users';
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
