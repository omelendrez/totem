<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-layout class="product">
      <v-flex mx-4 my-4>
        <v-card>
          <v-img :src="item.image" contain></v-img>
          <v-card-title>
            <div v-if="item.price!=='0'" class="description">{{item.description}}</div>
            <span v-if="item.price" class="price">$ {{showPrice}}</span>
          </v-card-title>
          <v-radio-group v-model="radioGroup" class="prices" v-if="item.price==='0'">
            <v-radio label="GRANDE" color="primary" :value="0"></v-radio>
            <v-radio label="MEDIANA" color="primary" :value="1"></v-radio>
            <v-radio label="CHICA" color="primary" :value="2"></v-radio>
          </v-radio-group>
          <v-radio-group v-if="item.flavor_1!==''" v-model="radioGroup2" class="flavors">
            <v-radio v-if="item.flavor_1!==''" :label="item.flavor_1" color="primary" :value="1"></v-radio>
            <v-radio v-if="item.flavor_2!==''" :label="item.flavor_2" color="primary" :value="2"></v-radio>
            <v-radio v-if="item.flavor_3!==''" :label="item.flavor_3" color="primary" :value="3"></v-radio>
            <v-radio v-if="item.flavor_4!==''" :label="item.flavor_4" color="primary" :value="4"></v-radio>
          </v-radio-group>
          <v-card-actions class="mb-2">
            <v-btn large absolute bottom left color="error" class="mb-3" @click.stop="close(item)">
              <v-icon>close</v-icon>&nbsp;salir
            </v-btn>
            <v-btn
              large
              absolute
              bottom
              right
              color="primary"
              class="mb-3"
              :disabled="showPrice===0"
              @click.stop="addProduct(item)"
            >
              <v-icon>shopping_cart</v-icon>&nbsp;agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
import store from "@/store";
export default {
  name: "Product",
  store,
  props: {
    add: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      dialog: false,
      item: {},
      radioGroup: 1,
      radioGroup2: 0,
      showPrice: 0,
      flavor: ""
    };
  },
  computed: {
    product() {
      return store.getters.product;
    }
  },
  watch: {
    radioGroup() {
      switch (this.radioGroup) {
        case 1:
          this.showPrice = this.item.medium_price;
          break;
        case 2:
          this.showPrice = this.item.small_price;
          break;
        default:
          this.showPrice = this.item.big_price;
      }
    },
    radioGroup2() {
      switch (this.radioGroup2) {
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
    },
    product() {
      this.product.price = this.product.price
        ? this.product.price.replace(".00", "")
        : this.product.price;
      this.item = this.product;
      this.dialog = this.product.name;
      if (parseInt(this.item.price) === 0) {
        this.showPrice = this.item.medium_price;
        this.radioGroup = 1;
      } else {
        this.showPrice = this.item.price;
      }
    }
  },
  methods: {
    close() {
      const item = {};
      store.dispatch("info", item);
    },
    addProduct(item) {
      const newItem = { ...item };
      if (parseInt(newItem.price) === 0) {
        switch (this.radioGroup) {
          case 0:
            newItem.price = newItem.big_price;
            newItem.description += " GRANDE";
            break;
          case 1:
            newItem.price = newItem.medium_price;
            newItem.description += " MEDIANA";
            break;
          case 2:
            newItem.price = newItem.small_price;
            newItem.description += " CHICA";
        }
        newItem.totalPrice = newItem.price;
        newItem.ticket_text = newItem.description;
      }
      if (this.flavor) {
        newItem.description += " " + this.flavor.toUpperCase();
        newItem.ticket_text = newItem.description;
      }
      this.add(newItem);
    }
  }
};
</script>
<style scoped>
.product {
  background: #ee3542;
}
.border-0 {
  border: 0;
}
.description {
  font-size: 1.2em;
}
.prices {
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  top: 360px;
  right: 60px;
  margin-top: 0;
  padding-bottom: 0;
}

.price {
  position: absolute;
  top: 10px;
  right: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #ee3542;
  border-radius: 30px;
  text-align: center;
  min-width: 160px;
  font-size: 3em;
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
