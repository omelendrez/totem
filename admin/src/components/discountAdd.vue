<template>
  <div class="discountAdd">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Categoría</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container>
            <label>Nombre</label>
            <md-input v-model="discount.name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Descripción</label>
            <md-input v-model="discount.description"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Porcentaje</label>
            <md-input type="number" v-model="discount.percent"></md-input>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveDiscount()">Guardar</md-button>
          <md-button class="md-raised md-primary" v-on:click.native="back()">Volver</md-button>

        </form>
      </md-whiteframe>

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
  name: 'discountAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      discount: {}
    };
  },
  methods: {
    saveDiscount() {
      if (!this.discount.name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const newDiscount = {
          name: this.discount.name,
          description: this.discount.description,
          percent: this.discount.percent,
          status_id: 2
        };

        HTTP.post('discounts', newDiscount)
          .then(() => {
            this.$router.push({ name: 'Discounts' });
          })
          .catch((error) => {
            this.errorMsg = {
              title: 'Error al guardar el Categoría',
              content: 'Ha ocurrido un error al intentar guardar la categoría'
            };
            this.showErrorMsg('dialog1');
            console.log(error.data.errors);
          });
      }
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    },
    back() {
      this.$router.push({ name: 'Discounts' });
    }
  },
  created() {
    this.api_url = this.$root.$data.api_url;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
