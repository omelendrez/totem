<template>
  <md-input-container>
    <form novalidate>
      <md-file
        v-model="file"
        ref="file"
        accept="image/*"
        placeholder="Seleccioná una imagen"
        v-on:selected="handleFileChange($event)"
      ></md-file>
      <md-button
        class="md-primary md-raised"
        :disabled="fileEmpty"
        v-on:click.native="submitFile"
      >Upload</md-button>
      <div v-show="error" class="error">Ha ocurrido un error intentando subir la imagen seleccionada</div>
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
      file: null,
      selectedFile: null,
      fileEmpty: true,
      error: false
    };
  },
  props: {
    execute: {
      type: Function
    },
    fileName: {
      type: String
    }
  },
  watch: {
    selectedFile() {
      this.fileEmpty = !this.selectedFile;
    }
  },
  methods: {
    handleFileChange(files) {
      this.selectedFile = files[0];
    },
    submitFile() {
      this.error = false;
      if (this.fileEmpty) return;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("fileName", this.fileName);
      HTTP.post(`${backendURL.images}image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(() => {
          this.file = null;
          this.selectedFile = null;
          this.execute();
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>
<style scoped>
.file {
  font-size: 1em;
}

.error {
  color: red;
}
</style>


