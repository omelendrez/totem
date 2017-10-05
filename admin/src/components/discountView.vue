<template>
  <div class="discounView">

    <md-toolbar class="md-primary">
      <span class="md-title">Vista De Descuento</span>
    </md-toolbar>

    <md-layout md-align="center">

      <md-card class="discount-card">
        <md-card-area md-inset>

          <md-card-header>
            <div class="md-title">
              {{discount.name}}
            </div>
            <div class="md-subheading">
              {{discount.description}}
            </div>
          </md-card-header>

          <md-card-content>
            <div>
              Porcentaje: {{discount.percent}} %
            </div>

            <div class="md-subhead">
              Info
            </div>
            <div>
              Status: {{discount.status.name}}
            </div>
            <div>
              Creado: {{discount.created_at}}
            </div>
            <div>
              Modificado: {{discount.updated_at}}
            </div>
          </md-card-content>

        </md-card-area>

        <md-card-actions>
          <md-button class="md-accent md-raised" v-on:click.native="editDiscount(discount.id)">Modificar</md-button>
          <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
        </md-card-actions>

      </md-card>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: 'discountView',
  data() {
    return {
      discount: {}
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
    editDiscount(id) {
      this.$router.push({ name: 'DiscountEdit', params: { id } });
    },
    back() {
      this.$router.push({ name: 'Discounts' });
    }
  },
  created() {
    this.fetchDiscount(this.$route.params.id);
    this.$root.$data.last_call = 'discountView';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.discount-card {
  margin: 20px;
  padding: 20px;
  width: 40%;
}
</style>
