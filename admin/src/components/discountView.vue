<template>
  <div class="discounView">

    <md-toolbar class="md-primary">
      <span class="md-title">{{discount.name}}</span>
    </md-toolbar>

    <md-layout md-align="center">
      <md-tabs>
        <md-tab id="discocunt" md-label="Descuento">
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
                  <div v-if="this.discount.status">
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
                <md-button class="md-accent md-raised" v-on:click.native="editDiscount(discount.id)">Editar</md-button>
                <md-button class="md-primary md-raised" v-on:click.native="back()">Volver</md-button>
              </md-card-actions>

            </md-card>
          </md-layout>
        </md-tab>
        <md-tab id="products" md-label="Productos">
          <DiscountProduct/>
        </md-tab>
      </md-tabs>

    </md-layout>
  </div>
</template>

<script>

import DiscountProduct from './discountProduct';
import HTTP from './http-common';

export default {
  name: 'discountView',
  data() {
    return {
      discount: {}
    };
  },
  methods: {
    fetchDiscount(id) {
      HTTP.get(`discounts/${id}`)
        .then((res) => {
          this.discount = res.data;
        })
        .catch((err) => {
          console.log(err);
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
    this.api_url = this.$root.$data.api_url;
    this.fetchDiscount(this.$route.params.id);
    this.$root.$data.last_call = 'discountView';
  },
  components: {
    DiscountProduct
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
