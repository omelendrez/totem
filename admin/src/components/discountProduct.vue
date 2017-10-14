<template>
  <div>
    <md-layout md-align="center">

      <md-card class="discountProduct-card">
        <md-card-area md-inset>

          <md-card-content>
            <md-table-card>

              <md-table>

                <md-table-header>
                  <md-table-row>
                    <md-table-head>Categoría</md-table-head>
                    <md-table-head>Sub-Categoría</md-table-head>
                    <md-table-head md-sort-by="code">Código</md-table-head>
                    <md-table-head md-sort-by="name">Nombre</md-table-head>
                    <md-table-head>Asignado</md-table-head>
                  </md-table-row>
                </md-table-header>

                <md-table-body>
                  <md-table-row v-for="(row, rowIndex) in assignedProducts" :key="rowIndex" :md-item="row">
                    <md-table-cell>{{row.category}}</md-table-cell>
                    <md-table-cell>{{row.sub_category}}</md-table-cell>
                    <md-table-cell>{{row.code}}</md-table-cell>
                    <md-table-cell>{{row.name}}</md-table-cell>
                    <md-table-cell>
                      <md-switch class="md-primary" v-on:click.native="unassignProduct(row.id)" v-model="row.assigned"></md-switch>
                    </md-table-cell>
                  </md-table-row>
                  <md-table-row v-for="(row, rowIndex) in unassignedProducts" :key="rowIndex" :md-item="row">
                    <md-table-cell>{{row.category}}</md-table-cell>
                    <md-table-cell>{{row.sub_category}}</md-table-cell>
                    <md-table-cell>{{row.code}}</md-table-cell>
                    <md-table-cell>{{row.name}}</md-table-cell>
                    <md-table-cell>
                      <md-switch class="md-primary" v-on:click.native="assignProduct(row.id)" v-model="row.assigned"></md-switch>
                    </md-table-cell>
                  </md-table-row>
                </md-table-body>

              </md-table>

            </md-table-card>
          </md-card-content>

        </md-card-area>

      </md-card>
    </md-layout>

    <md-dialog ref="dialog1">
      <md-dialog-title>{{errorMsg.title}}</md-dialog-title>
      <md-dialog-content>{{errorMsg.content}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="closeErrorMsg('dialog1')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>

import HTTP from './http-common';

export default {
  name: 'discountProduct',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      assignedProducts: [],
      unassignedProducts: [],
      discountId: null
    };
  },
  methods: {
    fetchAssingedProducts() {
      HTTP.get(`product_discount/${this.discountId}/discount?filter=active`)
        .then((res) => {
          const result = res.data.map(this.toBoolean);
          this.assignedProducts = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchUnassingedProducts() {
      HTTP.get(`product_discount/${this.discountId}/discount?filter=inactive`)
        .then((res) => {
          this.unassignedProducts = res.data.map(this.toBoolean);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toBoolean(item) {
      const curItem = item;
      curItem.assigned = item.assigned === 1;
      return curItem;
    },
    assignProduct(id) {
      const newProduct = {
        product_id: id,
        discount_id: this.discountId
      };
      HTTP.post('product_discount', newProduct)
        .then(() => {
          this.fetchAssingedProducts();
          this.fetchUnassingedProducts();
        })
        .catch((error) => {
          this.errorMsg = {
            title: 'Error al guardar agregar el Producto',
            content: 'Ha ocurrido un error al intentar agregar el producto'
          };
          this.showErrorMsg('dialog1');
          console.log(error.data.errors);
        });
    },
    unassignProduct(id) {
      HTTP.delete(`product_discount/${id}`)
        .then(() => {
          this.fetchAssingedProducts();
          this.fetchUnassingedProducts();
        })
        .catch((error) => {
          this.errorMsg = {
            title: 'Error al intentar desasignar el Producto',
            content: 'Ha ocurrido un error al intentar desasignar el producto'
          };
          this.showErrorMsg('dialog1');
          console.log(error.data.errors);
        });
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    }
  },
  created() {
    this.discountId = this.$route.params.id;
    this.fetchAssingedProducts();
    this.fetchUnassingedProducts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_header {
  width: 20px;
}

.discountProduct-card {
  width: 60%;
}

.md-table-head {
  background-color: #F6F5D7;
}
</style>
