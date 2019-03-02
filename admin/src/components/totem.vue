<template>
  <div class="totem">
    <md-toolbar>
      <h1 class="md-title">Activación de Tótems</h1>
    </md-toolbar>

    <md-layout md-align="center" class="container">
      <md-card>
        <md-toolbar>
          <h1 class="md-title">Activaciones</h1>
        </md-toolbar>
        <md-card-content>
          <md-card class="card" v-for="(totem, index) in totems" :key="index">
            <md-card-content>
              <md-switch
                v-model="totem.status_id"
                class="md-primary text"
                v-on:change="openDialog('confirmChange', totem)"
              >{{totem.name}} {{getStatus(totem)}}</md-switch>
            </md-card-content>
          </md-card>
        </md-card-content>
      </md-card>
    </md-layout>
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content="confirm.content"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @close="onClose"
      ref="confirmChange"
    ></md-dialog-confirm>
    <md-dialog ref="errorBox">
      <md-dialog-title>{{errorMsg.title}}</md-dialog-title>
      <md-dialog-content>{{errorMsg.content}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="closeErrorMsg('errorBox')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import HTTP from "./http-common";

export default {
  name: "totem",
  data() {
    return {
      totems: [],
      errorMsg: {
        title: "",
        content: ""
      },
      confirm: {
        title: "",
        content: "",
        ok: "Si",
        cancel: "No"
      },
      record: null
    };
  },
  mounted() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.loadTotems();
  },
  methods: {
    loadTotems() {
      HTTP.get("totem")
        .then(res => {
          const { rows } = res.data;
          this.totems = rows.map(item => {
            const totem = item;
            totem.status_id = item.status_id === 1;
            return totem;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    },
    openDialog(ref, totem) {
      this.confirm.title = totem.name;
      this.confirm.content = "Está seguro que desea {ACTION} el tótem?";
      this.confirm.content = this.confirm.content.replace(
        "{ACTION}",
        totem.status_id ? "DESACTIVAR" : "ACTIVAR"
      );
      this.$refs[ref].open();
      this.record = totem;
    },
    onClose(type) {
      if (type === "ok") {
        const id = this.record.id;
        HTTP.put(`totem/${id}`)
          .then(() => {
            this.loadTotems();
          })
          .catch(err => {
            this.errorMsg = {
              title: "Error al cambiar status",
              content: `Ha ocurrido un error al intentar cambiar status de ${
                this.record.name
              }`
            };
            this.showErrorMsg("errorBox");
            console.log(err);
            this.loadTotems();
          });
      } else {
        this.loadTotems();
      }
    },
    getStatus(totem) {
      return totem.status_id ? "Activo" : "Inactivo";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 18px;
}
.card {
  width: 400px;
}
.text {
  font-size: large;
}
.container .md-toolbar {
  background-color: #e1e0b8;
  color: #000;
}
</style>
