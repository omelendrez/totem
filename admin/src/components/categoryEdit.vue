<template>
  <div class="categoryEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">{{category.name}}</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container md-clearable>
            <label>Nombre</label>
            <md-input v-model="category.name"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Imagen</label>
            <md-input type="text" v-model="category.image"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Status</label>
            <md-select v-model="category.status_id">
              <md-option v-for="status in statuses" v-bind:value="status.id" :key="status.id">
                {{status.name}}
              </md-option>
            </md-select>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveCategory()">Guardar</md-button>
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
import HTTP from "./http-common";

export default {
  name: "categoryAdd",
  data() {
    return {
      errorMsg: {
        title: "",
        content: ""
      },
      category: {},
      statuses: []
    };
  },
  methods: {
    fetchCategory(id) {
      HTTP.get(`categories/${id}`)
        .then((res) => {
          this.category = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchStatus() {
      HTTP.get("status")
        .then((res) => {
          this.statuses = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveCategory() {
      if (!this.category.name) {
        this.errorMsg = {
          title: "Error en datos ingresados",
          content:
            "Por favor complete todos los datos del formulario y vuelva a intentar"
        };
        this.showErrorMsg("dialog1");
      } else {
        const editCategory = {
          name: this.category.name,
          status_id: this.category.status_id
        };

        const id = this.category.id;
        HTTP.put(`categories/${id}`, editCategory)
          .then(() => {
            this.back();
          })
          .catch((err) => {
            this.errorMsg = {
              title: "Error al guardar el Categoría",
              content: "Ha ocurrido un error al intentar guardar el Categoría"
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
      if (this.$root.$data.last_call === "categoryView") {
        this.$router.push({ name: "CategoryView" });
      } else {
        this.$router.push({ name: "Categories" });
      }
    }
  },
  created() {
    this.fetchStatus();
    this.fetchCategory(this.$route.params.id);
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
