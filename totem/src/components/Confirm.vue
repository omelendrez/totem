<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title primary-title  class="headline error white--text">{{title}}</v-card-title>
        <v-card-text class="headline">{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large @click="doConfirm(false)">{{buttonNoMsg}}</v-btn>
          <v-btn large color="error" @click="doConfirm(true)">{{buttonOkMsg}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    buttonOkMsg: {
      type: String,
      default: ""
    },
    buttonNoMsg: {
      type: String,
      default: ""
    },
    confirm: {
      type: Function,
      default: undefined
    }
  },
  watch: {
    message() {
      this.dialog = this.message.length;
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    doConfirm(value) {
      this.confirm(value);
    }
  }
};
</script>
<style scoped>
</style>

