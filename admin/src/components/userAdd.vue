<template>
  <div class="userAdd">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Usuario</h1>
    </md-toolbar>

    <md-layout md-align="center">
      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Usuario</label>
            <md-input v-model="user.user_name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Nombre</label>
            <md-input v-model="user.full_name"></md-input>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveUser()">Guardar</md-button>
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

import defaultPassword from "./../utils";

export default {
  name: "userAdd",
  data() {
    return {
      errorMsg: {
        title: "",
        content: ""
      },
      user: {}
    };
  },
  methods: {
    saveUser() {
      if (!this.user.user_name || !this.user.full_name) {
        this.errorMsg = {
          title: "Error en datos ingresados",
          content:
            "Por favor complete todos los datos del formulario y vuelva a intentar"
        };
        this.showErrorMsg("dialog1");
      } else {
        const { user_name, full_name } = this.user;
        const newUser = {
          user_name,
          full_name,
          password: defaultPassword,
          status: 1
        };

        HTTP.post("users", newUser)
          .then(() => {
            this.$router.push({ name: "Users" });
          })
          .catch((err) => {
            this.errorMsg = {
              title: "Error al guardar el Usuario",
              content: "Ha ocurrido un error al intentar guardar el usuario"
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
      this.$router.push({ name: "Users" });
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
