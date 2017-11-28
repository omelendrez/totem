<template>
  <div class="login">
    <md-layout md-tag="form" novalidate @submit.stop.prevent="submit" md-align="center">
      <md-layout md-tag="md-card" md-column md-flex="30" md-flex-medium="40" md-flex-small="60" md-flex-xsmall="90" class="md-primary">

        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-input-container>
            <md-icon>person</md-icon>
            <label>Usuario</label>
            <md-input username required v-model="user.user_name" />
          </md-input-container>

          <md-input-container md-has-password>
            <md-icon>lock</md-icon>
            <label>Password</label>
            <md-input type="password" required v-model="user.password" />
          </md-input-container>
        </md-card-content>

        <md-card-actions>
          <md-button @click="login()">Login</md-button>
        </md-card-actions>

      </md-layout>
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
  name: "login",
  data() {
    return {
      user: {
        user_name: "",
        password: ""
      },
      errorMsg: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.user.user_name || !this.user.password) {
        return;
      }
      const params = {
        user_name: this.user.user_name,
        password: this.user.password
      };
      HTTP.get("login", { params })
        .then(res => {
          this.user = res.data;
          setTimeout(() => {
            this.$root.$data.logged = true;
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 10);
          }, 10);
        })
        .catch(err => {
          console.log(err.data);
          this.errorMsg = {
            title: "Error",
            content:
              "Por favor verifique usuario y password y vuelva a intentar"
          };
          this.showErrorMsg("dialog1");
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
    this.$root.$data.logged = false;
  },
  updated() {
    this.$root.$data.logged = false;
  }
};
</script>

<style scoped>
.login {
  padding-top: 10%;
}
</style>
