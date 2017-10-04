<template>
  <div class="discounts">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Descuentos</h1>
    </md-toolbar>

    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Lista de Descuentos</h1>
      </md-toolbar>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="name">Nombre</md-table-head>
            <md-table-head>Descripción</md-table-head>
            <md-table-head>Porcentaje</md-table-head>
            <md-table-head>Status</md-table-head>

            <md-table-head class="button_header">Ver</md-table-head>
            <md-table-head class="button_header">Editar</md-table-head>
            <md-table-head class="button_header">Borrar</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in discounts" :key="rowIndex" :md-item="row">
            <md-table-cell>{{row.name}}</md-table-cell>
            <md-table-cell>{{row.description}}</md-table-cell>
            <md-table-cell>{{row.percent}} %</md-table-cell>
            <md-table-cell>{{row.status.name}}</md-table-cell>

            <md-table-cell>
              <md-button class="md-icon-button md-default md-raised" v-on:click.native="viewDiscount(row.id)">
                <md-icon>find_in_page</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell>
              <md-button class="md-icon-button md-default md-raised" v-on:click.native="editDiscount(row.id)">
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

    <md-button class="md-fab md-primary md-fab-bottom-right" v-on:click.native="addDiscount()">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog-confirm :md-title="confirm.title" :md-content="confirm.content" :md-ok-text="confirm.ok" :md-cancel-text="confirm.cancel" @close="onClose" ref="confirmDelete">
    </md-dialog-confirm>

  </div>
</template>

<script>
export default {
  name: 'discounts',
  data() {
    return {
      discounts: [],
      confirm: {
        title: '',
        content: 'Realmente desea eliminar el descuento seleccionado?',
        ok: 'Si',
        cancel: 'No'
      }
    };
  },
  methods: {
    fetchDiscounts() {
      this.$http.get('http://localhost:3000/discounts')
        .then((res) => {
          this.discounts = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    addDiscount() {
      this.$router.push({ name: 'DiscountAdd' });
    },
    editDiscount(id) {
      this.$router.push({ name: 'DiscountEdit', params: { id } });
    },
    viewDiscount(id) {
      this.$router.push({ name: 'DiscountView', params: { id } });
    },
    deleteDiscount(id) {
      this.$http.delete(`http://localhost:3000/discounts/${id}`)
        .then((res) => {
          console.log(res.body);
          this.fetchDiscounts();
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
        this.deleteDiscount(this.record_id);
      }
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: 'Login' });
    }

    this.fetchDiscounts();
    this.$root.$data.last_call = 'discounts';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_header {
  width: 20px;
}
</style>
