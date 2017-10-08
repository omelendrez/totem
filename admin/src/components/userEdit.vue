<template>
  <div class="userEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">{{user.full_name}}</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container md-clearable>
            <label>Usuario</label>
            <md-input v-model="user.user_name"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Nombre</label>
            <md-input v-model="user.full_name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Status</label>
            <md-select v-model="user.status_id">
              <md-option v-for="status in statuses" v-bind:value="status.id" :key="status.id">
                {{status.name}}
              </md-option>
            </md-select>
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
export default {
  name: 'userAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      user: {},
      statuses: [],
      api_url: null
    };
  },
  methods: {
    fetchUser(id) {
      this.$http.get(`${this.api_url}users/${id}`)
        .then((res) => {
          this.user = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    fetchStatus() {
      this.$http.get(`${this.api_url}status`)
        .then((res) => {
          this.statuses = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveUser() {
      if (!this.user.user_name || !this.user.full_name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const editUser = {
          user_name: this.user.user_name,
          full_name: this.user.full_name,
          status_id: this.user.status_id
        };

        const id = this.user.id;
        this.$http.put(`${this.api_url}users/${id}`, editUser)
          .then(() => {
            this.back();
          })
          .catch((error) => {
            this.errorMsg = {
              title: 'Error al guardar el Usero',
              content: 'Ha ocurrido un error al intentar guardar el usero'
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
    },
    back() {
      if (this.$root.$data.last_call === 'userView') {
        this.$router.push({ name: 'UserView' });
      } else {
        this.$router.push({ name: 'Users' });
      }
    }
  },
  created() {
    this.api_url = this.$root.$data.api_url;
    this.fetchStatus();
    this.fetchUser(this.$route.params.id);
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
