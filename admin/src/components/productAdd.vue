<template>
  <div class="productAdd">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Crear Producto</h1>
    </md-toolbar>

    <md-whiteframe class="whiteframe">
      <form novalidate @submit.stop.prevent="submit">

        <md-input-container>
          <label>Código</label>
          <md-input v-model="product.code"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="product.name"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Descripción</label>
          <md-input v-model="product.description"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Precio</label>
          <md-input type="number" v-model="product.price"></md-input>
          <md-icon>attach_money</md-icon>
        </md-input-container>

        <md-button class="md-raised md-accent" v-on:click.native="saveProduct()">Guardar</md-button>
        <md-button class="md-raised md-primary" v-on:click.native="back()">Salir</md-button>

      </form>
    </md-whiteframe>

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
      product: {}
    };
  },
  methods: {
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
          category_id: 1
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whiteframe {
  margin: 20px;
  padding: 20px;
  width: 50%;
}
</style>
