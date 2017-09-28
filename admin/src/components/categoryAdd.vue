<template>
  <div class="categoryAdd">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Categoría</h1>
      <router-link tag="md-button" :to="{ name: 'Categories' }" class="md-raised md-default">Categorías</router-link>
    </md-toolbar>

    <md-whiteframe class="whiteframe">
      <form novalidate @submit.stop.prevent="submit">

        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="category.name"></md-input>
        </md-input-container>

        <md-button class="md-raised md-accent" v-on:click.native="saveCategory()">Guardar</md-button>

      </form>
    </md-whiteframe>

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
export default {
  name: 'categoryAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      category: {}
    };
  },
  methods: {
    saveCategory() {
      if (!this.category.name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const newCategory = {
          name: this.category.name
        };

        this.$http.post('http://localhost:3000/categories', newCategory)
          .then(() => {
            this.$router.push({ name: 'Categories' });
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 600px;
}
</style>
