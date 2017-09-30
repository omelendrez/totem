<template>
  <div class="userEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Editando Usero</h1>
    </md-toolbar>

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

        <md-button class="md-raised md-accent" v-on:click.native="saveUser()">Guardar</md-button>
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
      user: {}
    };
  },
  methods: {
    fetchUser(id) {
      this.$http.get(`http://localhost:3000/users/${id}`)
        .then((res) => {
          this.user = res.body;
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
          status: 1
        };

        const id = this.user.id;
        this.$http.put(`http://localhost:3000/users/${id}`, editUser)
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
    this.fetchUser(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 50%;
}
</style>
