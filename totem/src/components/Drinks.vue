<template>
  <v-container fluid grid-list-lg class="drinks">
    <span class="message">
      Seleccioná tu bebida
      <v-btn color="info" absolute dark left @click.stop="back()">Volver</v-btn>
    </span>
    <v-layout wrap>
      <v-flex xs3 mb-4 v-for="(item, index) in items" :key="index">
        <v-content>
          <v-card ripple @click.stop="clickDrink(item)">
            <v-img :src="item.image" class="image"></v-img>
          </v-card>
        </v-content>
      </v-flex>
    </v-layout>
    <Confirm
      :title="title"
      :message="message"
      :image="image"
      :confirm="verifyContinue"
      :button-ok-msg="buttonOkMsg"
      :button-no-msg="buttonNoMsg"
      :additional="item.additional"
      :item="item"
    />
  </v-container>
</template>

<script>
import Confirm from "@/components/Confirm";

export default {
  name: "Drinks",
  components: {
    Confirm
  },
  props: {
    products: {
      type: Array,
      default: null
    },
    addDrink: {
      type: Function,
      default: undefined
    },
    selectedProduct: {
      type: Object,
      default: {}
    }
  },
  watch: {
    selectedProduct() {
      this.items = this.products.filter(item => {
        if (item.category_id === 5 && item.is_combo) {
          if (item.has_alcohol) {
            if (this.selectedProduct.category_id !== 6) {
              return item;
            }
          } else {
            return item;
          }
        }
      });
    }
  },
  methods: {
    back() {
      this.addDrink(null);
    },
    clickDrink(item) {
      this.item = item;
      this.title = "Confirmar";
      this.message = item.name;
      this.image = item.image;
      this.buttonOkMsg = "Si, confirmar";
      this.buttonNoMsg = "No, cambiar";
    },
    verifyContinue(value, flavor) {
      if (value) {
        const newItem = { ...this.item };
        if (flavor) {
          newItem.ticket_text += " " + flavor.toUpperCase();
        }
        this.addDrink(newItem);
      }
      this.message = "";
    }
  },
  data() {
    return {
      items: [],
      item: {},
      title: "",
      image: "",
      message: "",
      buttonOkMsg: "",
      buttonNoMsg: ""
    };
  }
};
</script>
<style scoped>
.drinks {
  overflow-y: scroll;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
.drinks::-webkit-scrollbar {
  width: 18px;
  height: 0;
  background-color: #dadada;
}
.drinks::-webkit-scrollbar-thumb {
  background-color: #999;
}
.image {
  height: 90%;
}
.message {
  text-transform: uppercase;
  text-align: center;
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  padding: 20px;
  font-size: 3em;
  font-weight: bold;
  border-radius: 6px;
  color: #ee3542;
  background-color: #fff;
  z-index: 1;
}
</style>
