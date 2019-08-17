<template>
  <div class="productView">
    <md-toolbar class="md-primary">
      <span class="md-title">{{product.name}}</span>
    </md-toolbar>

    <md-layout md-align="center">
      <md-card class="product-card">
        <md-card-area md-inset>
          <md-card-media class="image" v-on:click.native="showUpload">
            <md-image :md-src="image"></md-image>
            <div class="sin-imagen" v-if="!image">Sin imagen</div>
          </md-card-media>
          <md-card-content>
            <Upload :fileName="fileName" :execute="refreshUploaded" v-show="upload" />
          </md-card-content>
          <md-card-header>
            <div class="md-subhead" v-if="product.category">{{product.category.name}}</div>
            <div class="md-title">{{product.name}}</div>
            <div class="md-subhead">Código: {{product.code}}</div>
          </md-card-header>

          <md-card-content>
            {{product.description}}
            <h2>
              Precio:
              <md-icon>attach_money</md-icon>
              {{product.price}}
            </h2>
            <div class="md-subhead">Info</div>
            <div v-if="product.status">Status: {{product.status.name}}</div>
            <div>Creado: {{product.created_at}}</div>
            <div>Modificado: {{product.updated_at}}</div>
          </md-card-content>
        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editProduct()">Editar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </div>
</template>

<script>
import Upload from "./upload";
import HTTP from "./http-common";
import backendURL from "./../config";

export default {
  name: "productView",
  components: {
    Upload
  },
  data() {
    return {
      product: {},
      discounts: {},
      upload: false,
      fileName: null,
      image: null
    };
  },
  methods: {
    fetchProduct(id) {
      HTTP.get(`products/${id}`)
        .then(res => {
          const product = res.data;
          product.image = product.image.length
            ? `${backendURL.images}${product.image}`
            : null;
          this.product = product;
          this.fileName = `p_${product.id.toString(16)}`;
          this.image = product.image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct() {
      const id = this.product.id;
      this.$router.push({ name: "ProductEdit", params: { id } });
    },
    back() {
      this.$router.push({ name: "Products" });
    },
    showUpload() {
      this.upload = true;
    },
    refreshUploaded(fileName) {
      const payload = {
        fileName
      };
      const id = this.product.id;
      this.image = null;
      HTTP.put(`products/image/${id}`, payload)
        .then(() => {
          this.image = `${backendURL.images}${fileName}`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetchProduct(this.$route.params.id);
    this.$root.$data.last_call = "productView";
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

.image {
  border: 1px solid #ccc;
  width: 200px !important;
  height: 200px !important;
}

.sin-imagen {
  text-align: center;
  margin-top: 30%;
  font-size: 2em;
  color: #ccc;
}
</style>
