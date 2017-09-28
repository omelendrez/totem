<template>
  <div class="categoryEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Editando Categoría</h1>
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
    fetchCategory(id) {
      this.$http.get(`http://localhost:3000/categories/${id}`)
        .then((res) => {
          this.category = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveCategory() {
      if (!this.category.name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const editCategory = {
          name: this.category.name
        };

        const id = this.category.id;
        this.$http.put(`http://localhost:3000/categories/${id}`, editCategory)
          .then(() => {
            this.$router.push({ name: 'Categories' });
          })
          .catch((error) => {
            this.errorMsg = {
              title: 'Error al guardar el Categoría',
              content: 'Ha ocurrido un error al intentar guardar el Categoría'
            };
            this.showErrorMsg('dialog1');
            console.log(error);
          });
      }
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    }
  },
  created() {
    this.fetchCategory(this.$route.params.id);
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
