<template>
  <div class="productAdd">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Producto</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container>
            <label>Categoría</label>
            <md-select v-model="product.category_id">
              <md-option v-for="category in categories" v-bind:value="category.id" :key="category.id">
                {{category.name}}
              </md-option>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label>Código</label>
            <md-input required v-model="product.code"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Nombre</label>
            <md-input required v-model="product.name"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Descripción</label>
            <md-input v-model="product.description"></md-input>
          </md-input-container>

          <md-input-container>
            <md-icon>attach_money</md-icon>
            <label>Precio</label>
            <md-input type="number" v-model="product.price"></md-input>
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
export default {
  name: 'productAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      product: {},
      categories: []
    };
  },
  methods: {
    fetchCategories() {
      this.$http.get('http://localhost:3000/categories')
        .then((res) => {
          this.categories = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveProduct() {
      if (!this.product.code || !this.product.name || !this.product.price) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const newProduct = {
          code: this.product.code,
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          category_id: this.product.category_id
        };

        this.$http.post('http://localhost:3000/products', newProduct)
          .then(() => {
            this.$router.push({ name: 'Products' });
          })
          .catch((error) => {
            this.errorMsg = {
              title: 'Error al guardar el Producto',
              content: 'Ha ocurrido un error al intentar guardar el producto'
            };
            this.showErrorMsg('dialog1');
            console.log(error.data.errors);
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
      this.$router.push({ name: 'Products' });
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
