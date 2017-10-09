<template>
  <div class="productView">

    <md-toolbar class="md-primary">
      <span class="md-title">{{product.name}}</span>
    </md-toolbar>

    <md-layout md-align="center">

      <md-card class="product-card">
        <md-card-area md-inset>
          <md-card-media>
            <md-image :md-src="src"></md-image>
          </md-card-media>

          <md-card-header>
            <div class="md-subhead" v-if="this.product.category">
              {{product.category.name}}
            </div>
            <div class="md-subhead" v-if="this.product.category">
              {{product.sub_category.name}}
            </div>
            <div class="md-title">
              {{product.name}}
            </div>
            <div class="md-subhead">
              Código: {{product.code}}
            </div>
          </md-card-header>

          <md-card-content>
            {{product.description}}
            <h2>Precio:
              <md-icon>attach_money</md-icon>
              {{product.price}}</h2>
            <div class="md-subhead">
              Info
            </div>
            <div v-if="this.product.status">
              Status: {{product.status.name}}
            </div>
            <div>
              Creado: {{product.created_at}}
            </div>
            <div>
              Modificado: {{product.updated_at}}
            </div>
          </md-card-content>

        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editProduct(product.id)">Editar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>

      </md-card>

    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'productView',
  data() {
    return {
      product: {},
      discounts: {},
      src: '/static/hamburger.png',
      api_url: null
    };
  },
  methods: {
    fetchProduct(id) {
      this.$http.get(`${this.api_url}products/${id}`)
        .then((res) => {
          this.product = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    editProduct(id) {
      this.$router.push({ name: 'ProductEdit', params: { id } });
    },
    back() {
      this.$router.push({ name: 'Products' });
    }
  },
  created() {
    this.api_url = this.$root.$data.api_url;
    this.fetchProduct(this.$route.params.id);
    this.$root.$data.last_call = 'productView';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-card {
  margin: 20px;
  padding: 20px;
  width: 30%;
}

.md-image {
  width: 50% !important;
}
</style>
