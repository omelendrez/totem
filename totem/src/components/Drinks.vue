<template>
  <v-container fluid grid-list-lg class="drinks">
    <span class="message">
      Seleccioná tu bebida
      <v-btn color="info" absolute dark left @click.stop="back()">Volver</v-btn>
    </span>
    <v-layout wrap>
      <v-flex xs3 mb-4 v-for="(item, index) in items" :key="index">
        <v-content>
          <v-card ripple>
            <v-img :src="item.image" class="image"></v-img>
            <span class="name">{{item.name}}</span>
            <v-card-actions class="mb-2">
              <v-btn dark fab absolute bottom right color="primary" @click.stop="addDrink(item)">
                <v-icon>add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Drinks",
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
    }
  },
  data() {
    return {
      items: []
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
.name {
  text-align: center;
  position: absolute;
  bottom: 56px;
  width: 100%;
  font-weight: 900;
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
