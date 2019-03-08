<template>
  <v-layout row justify-center>
    <v-dialog v-model="processing" persistent width="50%" transition="scale-transition">
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
import store from "@/store";
export default {
  name: "Processing",
  store,
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
      const active = this.message.length > 0;
      this.processing = active;
      if (active) {
        setTimeout(() => {
          store.dispatch("resetError");
        }, 3000);
      }
    }
  }
};
</script>

