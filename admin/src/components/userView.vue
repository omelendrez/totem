<template>
  <div class="userView">

    <md-card class="card-example">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
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
            Tracking
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

  </div>
</template>

<script>
export default {
  name: 'userView',
  data() {
    return {
      user: {},
      src: null
    };
  },
  methods: {
    fetchProduct(id) {
      this.$http.get(`http://localhost:3000/users/${id}`)
        .then((res) => {
          this.user = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    editUser(id) {
      this.$router.push({ name: 'UserEdit', params: { id } });
    },
    back() {
      this.$router.push({ name: 'Users' });
    }
  },
  created() {
    this.fetchProduct(this.$route.params.id);
    this.$root.$data.last_call = 'userView';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-example {
  margin: 20px;
  padding: 20px;
  width: 30%;
}
</style>
