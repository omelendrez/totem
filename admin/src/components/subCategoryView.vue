<template>
  <div class="subCategoryView">

    <md-toolbar class="md-primary">
      <span class="md-title">{{subCategory.name}}</span>
    </md-toolbar>

    <md-layout md-align="center">

      <md-card class="sub-category-card">
        <md-card-area md-inset>

          <md-card-header>
            <div class="md-title">
              {{subCategory.name}}
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-subhead">
              Info
            </div>
            <div v-if="this.subCategory.status">
              Status: {{subCategory.status.name}}
            </div>
            <div>
              Creado: {{subCategory.created_at}}
            </div>
            <div>
              Modificado: {{subCategory.updated_at}}
            </div>
          </md-card-content>

        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editSubCategory(subCategory.id)">Editar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>

      </md-card>

    </md-layout>
  </div>
</template>

<script>
import HTTP from "./http-common";

export default {
  name: "subCategoryView",
  data() {
    return {
      subCategory: {}
    };
  },
  methods: {
    fetchSubCategory(id) {
      HTTP.get(`sub_categories/${id}`)
        .then(res => {
          this.subCategory = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editSubCategory(id) {
      this.$router.push({ name: "SubCategoryEdit", params: { id } });
    },
    back() {
      this.$router.push({ name: "SubCategories" });
    }
  },
  created() {
    this.fetchSubCategory(this.$route.params.id);
    this.$root.$data.last_call = "subCategoryView";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-category-card {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
