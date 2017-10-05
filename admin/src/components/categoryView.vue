<template>
  <div class="categoryView">

    <md-toolbar class="md-primary">
      <span class="md-title">Vista De Categoría</span>
    </md-toolbar>

    <md-layout md-align="center">

      <md-card class="category-card">
        <md-card-area md-inset>

          <md-card-header>
            <div class="md-title">
              {{category.name}}
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-subhead">
              Info
            </div>
            <div>
              Status: {{category.status.name}}
            </div>
            <div>
              Creado: {{category.created_at}}
            </div>
            <div>
              Modificado: {{category.updated_at}}
            </div>
          </md-card-content>

        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editCategory(category.id)">Modificar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>

      </md-card>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'categoryView',
  data() {
    return {
      category: {}
    };
  },
  methods: {
    fetchCategory(id) {
      this.$http.get(`http://localhost:3000/categories/${id}`)
        .then((res) => {
          this.category = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    editCategory(id) {
      this.$router.push({ name: 'CategoryEdit', params: { id } });
    },
    back() {
      this.$router.push({ name: 'Categories' });
    }
  },
  created() {
    this.fetchCategory(this.$route.params.id);
    this.$root.$data.last_call = 'categoryView';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category-card {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
