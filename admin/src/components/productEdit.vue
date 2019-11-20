<template>
  <div class="productEdit">
    <md-toolbar class="md-primary">
      <h1 class="md-title">{{product.name}}</h1>
    </md-toolbar>

    <md-layout md-align="center">
      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Categoría</label>
            <md-select v-model="product.category_id">
              <md-option
                v-for="category in categories"
                v-bind:value="category.id"
                :key="category.id"
              >{{category.name}}</md-option>
            </md-select>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Código</label>
            <md-input v-model="product.code"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Nombre</label>
            <md-input v-model="product.name" required></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Descripción</label>
            <md-textarea v-model="product.description" required></md-textarea>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Texto ticket</label>
            <md-input v-model="product.ticket_text"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Texto cocina</label>
            <md-input v-model="product.kitchen_text"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Precio</label>
            <md-icon>attach_money</md-icon>
            <md-input type="number" v-model="product.price"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Precio chica</label>
            <md-icon>attach_money</md-icon>
            <md-input type="number" v-model="product.small_price"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Precio mediana</label>
            <md-icon>attach_money</md-icon>
            <md-input type="number" v-model="product.medium_price"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Precio grande</label>
            <md-icon>attach_money</md-icon>
            <md-input type="number" v-model="product.big_price"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Sabor 1</label>
            <md-input type="text" v-model="product.flavor_1"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Sabor 2</label>
            <md-input type="text" v-model="product.flavor_2"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Sabor 3</label>
            <md-input type="text" v-model="product.flavor_3"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Sabor 4</label>
            <md-input type="text" v-model="product.flavor_4"></md-input>
          </md-input-container>

          <md-input-container>
            <label>En combo</label>
            <md-select v-model="product.is_combo">
              <md-option
                v-for="option in yesno"
                v-bind:value="option.id"
                :key="option.id"
              >{{option.name}}</md-option>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label>Contiene alcohol</label>
            <md-select v-model="product.has_alcohol">
              <md-option
                v-for="option in yesno"
                v-bind:value="option.id"
                :key="option.id"
              >{{option.name}}</md-option>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label>Status</label>
            <md-select v-model="product.status_id">
              <md-option
                v-for="status in statuses"
                v-bind:value="status.id"
                :key="status.id"
              >{{status.name}}</md-option>
            </md-select>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveProduct()">Guardar</md-button>
          <md-button class="md-raised md-primary" v-on:click.native="back()">Volver</md-button>
        </form>
      </md-whiteframe>
    </md-layout>

    <md-dialog ref="dialog1">
      <md-dialog-title>{{errorMsg.title}}</md-dialog-title>
      <md-dialog-content>{{errorMsg.content}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="closeErrorMsg('dialog1')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { yesNo } from "@/utils";
import HTTP from "./http-common";

export default {
  name: "productAdd",
  data() {
    return {
      errorMsg: {
        title: "",
        content: ""
      },
      product: {},
      categories: [],
      statuses: [],
      yesno: []
    };
  },
  methods: {
    fetchCategories() {
      HTTP.get("categories")
        .then(res => {
          this.categories = res.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchStatus() {
      HTTP.get("status")
        .then(res => {
          this.statuses = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchProduct(id) {
      HTTP.get(`products/${id}`)
        .then(res => {
          this.product = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveProduct() {
      if (!this.product.code || !this.product.name || !this.product.price) {
        this.errorMsg = {
          title: "Error en datos ingresados",
          content:
            "Por favor complete todos los datos del formulario y vuelva a intentar"
        };
        this.showErrorMsg("dialog1");
      } else {
        const editProduct = this.product;

        const id = this.product.id;
        HTTP.put(`products/${id}`, editProduct)
          .then(() => {
            this.back();
          })
          .catch(err => {
            this.errorMsg = {
              title: "Error al guardar el Producto",
              content: "Ha ocurrido un error al intentar guardar el producto"
            };
            this.showErrorMsg("dialog1");
            console.log(err);
          });
      }
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    },
    back() {
      if (this.$root.$data.last_call === "productView") {
        this.$router.push({ name: "ProductView" });
      } else {
        this.$router.push({ name: "Products" });
      }
    }
  },
  created() {
    this.yesno = yesNo;
    this.fetchCategories();
    this.fetchStatus();
    this.fetchProduct(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 30%;
}
</style>
