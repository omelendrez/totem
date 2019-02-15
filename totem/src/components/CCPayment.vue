<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title primary-title class="headline error white--text"></v-card-title>
        <v-card-text class="headline"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large @click="doConfirm(false)"></v-btn>
          <v-btn large color="error" @click="doConfirm(true)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "CCPayment",
  data() {
    return {};
  }
};
</script>
