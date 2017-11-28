<template>
  <div class="userView">

    <md-toolbar class="md-primary">
      <h1 class="md-title">{{user.full_name}}</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-card class="user-card">
        <md-card-area md-inset>
          <md-card-media>
            <md-image class="image" :md-src="src"></md-image>
          </md-card-media>

          <md-card-header>
            <div class="md-title">
              {{user.user_name}}
            </div>
            <div>
              {{user.full_name}}
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-subhead">
              Info
            </div>
            <div v-if="this.user.status">
              Status: {{user.status.name}}
            </div>
            <div>
              Creado: {{user.created_at}}
            </div>
            <div>
              Modificado: {{user.updated_at}}
            </div>
          </md-card-content>

        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editUser(user.id)">Editar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>

      </md-card>

    </md-layout>

  </div>
</template>

<script>
import HTTP from "./http-common";

export default {
  name: "userView",
  data() {
    return {
      user: {},
      src: null
    };
  },
  methods: {
    fetchProduct(id) {
      HTTP.get(`users/${id}`)
        .then(res => {
          this.user = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editUser(id) {
      this.$router.push({ name: "UserEdit", params: { id } });
    },
    back() {
      this.$router.push({ name: "Users" });
    }
  },
  created() {
    this.fetchProduct(this.$route.params.id);
    this.$root.$data.last_call = "userView";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-card {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
