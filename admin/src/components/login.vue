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
            <md-input username required v-model="username" />
          </md-input-container>

          <md-input-container md-has-password>
            <md-icon>lock</md-icon>
            <label>Password</label>
            <md-input type="password" required v-model="password" />
          </md-input-container>
        </md-card-content>

        <md-card-actions>
          <md-button @click="login()">Login</md-button>
        </md-card-actions>

      </md-layout>
    </md-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$root.$data.logged = true;
      this.$router.push({ name: 'Home' });
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
