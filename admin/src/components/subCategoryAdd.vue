<template>
  <div class="subCategoryAdd">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Sub-Categoría</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container>
            <label>Nombre</label>
            <md-input v-model="subCategory.name"></md-input>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveSubCategory()">Guardar</md-button>
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
import HTTP from "./http-common";

export default {
  name: "subCategoryAdd",
  data() {
    return {
      errorMsg: {
        title: "",
        content: ""
      },
      subCategory: {}
    };
  },
  methods: {
    saveSubCategory() {
      if (!this.subCategory.name) {
        this.errorMsg = {
          title: "Error en datos ingresados",
          content:
            "Por favor complete todos los datos del formulario y vuelva a intentar"
        };
        this.showErrorMsg("dialog1");
      } else {
        const newSubCategory = {
          name: this.subCategory.name
        };

        HTTP.post("sub_categories", newSubCategory)
          .then(() => {
            this.$router.push({ name: "SubCategories" });
          })
          .catch((err) => {
            this.errorMsg = {
              title: "Error al guardar la Sub-Categoría",
              content:
                "Ha ocurrido un error al intentar guardar la sub-categoría"
            };
            this.showErrorMsg("dialog1");
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
      this.$router.push({ name: "SubCategories" });
    }
  },
  created() {}
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
