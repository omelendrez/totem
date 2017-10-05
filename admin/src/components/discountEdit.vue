<template>
  <div class="discountEdit">

    <md-toolbar class="md-primary">
      <h1 class="md-title">Editando Descuento</h1>
    </md-toolbar>

    <md-layout md-align="center">

      <md-whiteframe class="whiteframe">
        <form novalidate @submit.stop.prevent="submit">

          <md-input-container md-clearable>
            <label>Nombre</label>
            <md-input v-model="discount.name"></md-input>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Descripción</label>
            <md-textarea v-model="discount.description"></md-textarea>
          </md-input-container>

          <md-input-container md-clearable>
            <label>Porcentaje</label>
            <md-input type="number" v-model="discount.percent"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Status</label>
            <md-select v-model="discount.status_id">
              <md-option v-for="status in statuses" v-bind:value="status.id" :key="status.id">
                {{status.name}}
              </md-option>
            </md-select>
          </md-input-container>

          <md-button class="md-raised md-accent" v-on:click.native="saveDiscount()">Guardar</md-button>
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
  name: 'discountAdd',
  data() {
    return {
      errorMsg: {
        title: '',
        content: ''
      },
      discount: {},
      statuses: []
    };
  },
  methods: {
    fetchDiscount(id) {
      this.$http.get(`http://localhost:3000/discounts/${id}`)
        .then((res) => {
          this.discount = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    fetchStatus() {
      this.$http.get('http://localhost:3000/status')
        .then((res) => {
          this.statuses = res.body;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    saveDiscount() {
      if (!this.discount.name) {
        this.errorMsg = {
          title: 'Error en datos ingresados',
          content: 'Por favor complete todos los datos del formulario y vuelva a intentar'
        };
        this.showErrorMsg('dialog1');
      } else {
        const editDiscount = {
          name: this.discount.name,
          description: this.discount.description,
          percent: this.discount.percent,
          status_id: this.discount.status_id
        };

        const id = this.discount.id;
        this.$http.put(`http://localhost:3000/discounts/${id}`, editDiscount)
          .then(() => {
            this.back();
          })
          .catch((error) => {
            this.errorMsg = {
              title: 'Error al guardar el Descuento',
              content: 'Ha ocurrido un error al intentar guardar el Descuento'
            };
            this.showErrorMsg('dialog1');
            console.log(error);
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
      if (this.$root.$data.last_call === 'discountView') {
        this.$router.push({ name: 'DiscountView' });
      } else {
        this.$router.push({ name: 'Discounts' });
      }
    }
  },
  created() {
    this.fetchStatus();
    this.fetchDiscount(this.$route.params.id);
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
