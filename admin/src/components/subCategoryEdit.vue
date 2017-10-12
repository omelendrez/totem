<template>
  <div class="subCategoryEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">{{subCategory.name}}</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container md-clearable>
            <label>Nombre</label>
            <md-input v-model="subCategory.name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Status</label>
            <md-select v-model="subCategory.status_id">
              <md-option v-for="status in statuses" v-bind:value="status.id" :key="status.id">
                {{status.name}}
              </md-option>
            </md-select>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveSubCategory()">Guardar</md-button>
          <md-button class="md-raised md-primary" v-on:click.native="back()">Volver</md-button>

        </form>
      </md-whiteframe>

      <md-dialog ref="dialog1">
        <md-dialog-title>{{errorMsg.title}}</md-dialog-title>
        <md-dialog-content>{{errorMsg.content}}</md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary md-raised" @click="closeErrorMsg('dialog1')">Ok</md-button>
        </md-dialog-actions>
      </md-dialog>

    </md-layout>

  </div>
</template>

<script>

import HTTP from './http-common';

export default {
  name: 'subCategoryAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      subCategory: {},
      statuses: []
    };
  },
  methods: {
    fetchSubCategory(id) {
      HTTP.get(`sub_categories/${id}`)
        .then((res) => {
          this.subCategory = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchStatus() {
      HTTP.get('status')
        .then((res) => {
          this.statuses = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveSubCategory() {
      if (!this.subCategory.name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const editSubCategory = {
          name: this.subCategory.name,
          status_id: this.subCategory.status_id
        };

        const id = this.subCategory.id;
        HTTP.put(`sub_categories/${id}`, editSubCategory)
          .then(() => {
            this.back();
          })
          .catch((err) => {
            this.errorMsg = {
              title: 'Error al guardar la Sub-Categoría',
              content: 'Ha ocurrido un error al intentar guardar el Sub-Categoría'
            };
            this.showErrorMsg('dialog1');
            console.log(err);
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
      if (this.$root.$data.last_call === 'subCategoryView') {
        this.$router.push({ name: 'SubCategoryView' });
      } else {
        this.$router.push({ name: 'SubCategories' });
      }
    }
  },
  created() {
    this.api_url = this.$root.$data.api_url;
    this.fetchStatus();
    this.fetchSubCategory(this.$route.params.id);
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
