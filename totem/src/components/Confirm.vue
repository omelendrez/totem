<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-layout v-bind:class="{ confirm: image }">
      <v-flex v-bind:class="{ padding: image }">
        <v-card>
          <v-img v-if="image" :src="image" contain></v-img>
          <v-card-title v-if="!image" primary-title class="headline error white--text">{{title}}</v-card-title>
          <v-card-text v-if="!image" class="headline">{{message}}</v-card-text>
          <v-card-text
            v-if="image && parseFloat(additional)"
            class="additional"
          >La cerveza tiene un adicional de ${{additional}}</v-card-text>
          <v-radio-group
            v-if="item.flavor_1 && item.flavor_1!==''"
            v-model="radioGroup2"
            class="flavors"
          >
            <v-radio
              v-if="item && item.flavor_1 && item.flavor_1!==''"
              :label="item.flavor_1"
              color="primary"
              :value="1"
            ></v-radio>
            <v-radio
              v-if="item && item.flavor_2 && item.flavor_2!==''"
              :label="item.flavor_2"
              color="primary"
              :value="2"
            ></v-radio>
            <v-radio
              v-if="item && item.flavor_3 && item.flavor_3!==''"
              :label="item.flavor_3"
              color="primary"
              :value="3"
            ></v-radio>
            <v-radio
              v-if="item && item.flavor_4 && item.flavor_4!==''"
              :label="item.flavor_4"
              color="primary"
              :value="4"
            ></v-radio>
          </v-radio-group>
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
    item: {
      type: Object,
      default: () => {
        return {
          flavor_1: ""
        };
      }
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
    },
    additional: {
      type: String,
      default: ""
    }
  },
  watch: {
    message() {
      this.dialog = this.message.length;
    },
    radioGroup2() {
      switch (this.radioGroup2) {
        case 0:
          this.flavor = '';
          break;
        case 2:
          this.flavor = this.item.flavor_2;
          break;
        case 3:
          this.flavor = this.item.flavor_3;
          break;
        case 4:
          this.flavor = this.item.flavor_4;
          break;
        default:
          this.flavor = this.item.flavor_1;
      }
    }
  },
  data() {
    return {
      dialog: false,
      radioGroup2: 0,
      flavor: ""
    };
  },
  methods: {
    doConfirm(value) {
      this.confirm(value, this.flavor);
      this.radioGroup2 = 0;
      this.flavor = "";
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
.additional {
  position: absolute;
  bottom: 80px;
  font-size: 1.6em;
  text-align: center;
}
.flavors {
  position: absolute;
  top: 380px;
  right: 60px;
  margin-top: 0;
  padding-bottom: 0;
  padding: 10px;
}
</style>
