<template>
  <v-layout row justify-center>
    <v-dialog v-model="processing" persistent width="300" transition="scale-transition">
      <v-card color="error" dark>
        <v-card-text>
          <h1>{{message}}</h1>
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "Processing",
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      processing: false
    };
  },
  watch: {
    message() {
      this.processing = this.message.length;
    }
  }
};
</script>

