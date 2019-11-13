<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-layout v-bind:class="{ confirm: image }">
      <v-flex v-bind:class="{ padding: image }">
        <v-card>
          <v-img v-if="image" :src="image" contain></v-img>
          <v-card-title v-if="!image" primary-title class="headline error white--text">{{title}}</v-card-title>
          <v-card-text v-if="!image" class="headline">{{message}}</v-card-text>
          <v-card-actions v-if="image">
            <v-btn
              large
              absolute
              bottom
              left
              color="error"
              class="mb-3"
              @click.stop="doConfirm(false)"
            >
              <v-icon>close</v-icon>&nbsp;cambiar
            </v-btn>
            <v-btn
              large
              absolute
              bottom
              right
              color="primary"
              class="mb-3"
              @click.stop="doConfirm(true)"
            >
              <v-icon>shopping_cart</v-icon>&nbsp;agregar
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="!image">
            <v-spacer></v-spacer>
            <v-btn large @click.stop="doConfirm(false)">{{buttonNoMsg}}</v-btn>
            <v-btn large color="error" @click.stop="doConfirm(true)">{{buttonOkMsg}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
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
    },
    image: {
      type: String,
      default: ""
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
.confirm {
  background: #ee3542;
}
.padding {
  margin: 2rem;
}
</style>
