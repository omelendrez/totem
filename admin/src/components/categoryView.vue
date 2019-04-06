<template>
  <div class="categoryView">
    <md-toolbar class="md-primary">
      <span class="md-title">{{category.name}}</span>
    </md-toolbar>

    <md-layout md-align="center">
      <md-card class="category-card">
        <md-card-area md-inset>
          <md-card-media v-on:click.native="showUpload">
            <md-image :md-src="image"></md-image>
          </md-card-media>
          <md-card-content>
            <Upload :fileName="fileName" :execute="refreshUploaded" v-show="upload"/>
          </md-card-content>
          <md-card-header>
            <div class="md-title">{{category.name}}</div>
          </md-card-header>

          <md-card-content>
            <div class="md-subhead">Info</div>
            <div v-if="this.category.status">Status: {{category.status.name}}</div>
            <div>Creado: {{category.created_at}}</div>
            <div>Modificado: {{category.updated_at}}</div>
          </md-card-content>
        </md-card-area>

        <md-card-actions>
          <md-button
            class="md-accent md-raised"
            v-on:click.native="editCategory(category.id)"
          >Editar</md-button>
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
  name: "categoryView",
  components: {
    Upload
  },
  data() {
    return {
      category: {},
      upload: false,
      fileName: null,
      image: null
    };
  },
  methods: {
    fetchCategory(id) {
      HTTP.get(`categories/${id}`)
        .then(res => {
          const category = res.data;
          category.image = `${backendURL.images}${category.image}`;
          this.category = category;
          this.fileName = `c_${category.id.toString(16)}`;
          this.image = category.image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editCategory(id) {
      this.$router.push({ name: "CategoryEdit", params: { id } });
    },
    back() {
      this.$router.push({ name: "Categories" });
    },
    showUpload() {
      this.upload = true;
    },
    refreshUploaded() {
      this.image = null;
      setTimeout(() => {
        this.image = this.category.image;
      }, 200);
    }
  },
  mounted() {
    this.fetchCategory(this.$route.params.id);
    this.$root.$data.last_call = "categoryView";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category-card {
  margin: 20px;
  padding: 20px;
  width: 30%;
}

.md-image {
  width: 50% !important;
}
</style>
