<template>
  <div class="productEdit">

    <md-card class="card-example">
      <md-card-area md-inset>
        <md-card-media md-ratio="16:9">
          <md-image :md-src="src"></md-image>
        </md-card-media>

        <md-card-header>
          <div class="md-subhead">
            {{product.category.name}}
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
          <h4>Precio: {{product.price}}</h4>
          <div class="md-subhead">
            Info
          </div>
          <div>
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
        <md-button class="md-accent md-raised" v-on:click.native="editProduct(product.id)">Modificar</md-button>
        <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
      </md-card-actions>

    </md-card>

  </div>
</template>

<script>
export default {
  name: 'productView',
  data() {
    return {
      product: {},
      src: '/static/hamburger.png'
    };
  },
  methods: {
    fetchProduct(id) {
      this.$http.get(`http://localhost:3000/products/${id}`)
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
    this.fetchProduct(this.$route.params.id);
    this.$root.$data.last_call = 'productView';
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
