<template>
  <div v-if="itemSet" class="details">
    <md-layout md-align="center">

      <md-card class="product-card" v-bind:class="{ active: fromBasket }">
        <md-card-area md-inset>
          <md-card-media md-ratio="16:9">
            <md-image :md-src="product.image"></md-image>
          </md-card-media>

          <md-card-header>
            <div class="md-subhead" v-if="this.product.category">
              {{product.category.name}}
            </div>
            <div class="md-subhead" v-if="this.product.sub_category">
              {{product.sub_category.name}}
            </div>
            <div class="md-title">
              {{product.name}}
            </div>
          </md-card-header>

          <md-card-content>
            {{product.description}}
            <h2>Precio:
              <md-icon>attach_money</md-icon>
              {{product.price}}</h2>
          </md-card-content>

        </md-card-area>
        <md-card-actions>
          <md-button v-if="fromBasket" class="md-accent md-raised" v-on:click.native="eliminar(product)">Eliminar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Cerrar</md-button>
          <md-button v-if="fromProducts" class="md-accent md-raised" v-on:click.native="comprar(product)">Comprar</md-button>
        </md-card-actions>

      </md-card>
    </md-layout>

  </div>
</template>

<script>
import store from "@/store";
import { types } from "@/store/mutation-types";

export default {
  store,
  computed: {
    product() {
      return store.getters.product;
    },
    itemSet() {
      return store.getters.itemSet;
    },
    fromBasket() {
      return store.getters.product.from === "basket";
    },
    fromProducts() {
      return store.getters.product.from === "products";
    }
  },
  methods: {
    eliminar(item) {
      store.dispatch(types.REMOVE_ITEM, item);
    },
    comprar(item) {
      store.dispatch(types.ADD_ITEM, item);
    },
    back() {
      store.dispatch(types.UNSET_ITEM);
    }
  }
};
</script>

<style scoped>
.product-card {
  padding: 20px;
  width: 40%;
}

.active {
  background-color: lightgoldenrodyellow !important;
}
</style>
