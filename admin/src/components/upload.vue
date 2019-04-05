<template>
  <md-input-container>
    <form novalidate>
      <input type="file" ref="file" class="file" v-on:change="handleFileChange">
      <md-button class="md-primary md-raised" v-on:click.native="submitFile">Upload</md-button>
    </form>
  </md-input-container>
</template>

<script>
import HTTP from "./http-common";
import backendURL from "./../config";

export default {
  name: "Upload",
  data() {
    return {
      file: null
    };
  },
  props: {
    execute: {
      type: Function
    }
  },
  methods: {
    handleFileChange() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      HTTP.post(`${backendURL.images}image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(() => {
          this.execute();
        })
        .catch(() => {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>
<style scoped>
.file {
  font-size: 1em;
}
</style>


