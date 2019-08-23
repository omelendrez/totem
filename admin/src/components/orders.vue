<template>
  <div class="orders">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Tickets</h1>
    </md-toolbar>

    <md-layout md-align="center">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Tickets generados</h1>
        </md-toolbar>

        <md-table @sort="onSort" md-sort="order_number">
          <md-table-header>
            <md-table-row>
              <md-table-head>Tótem</md-table-head>
              <md-table-head md-sort-by="order_number">Ticket</md-table-head>
              <md-table-head md-sort-by="total_price">Total</md-table-head>
              <md-table-head>Medio de Pago</md-table-head>
              <md-table-head>Status</md-table-head>
              <md-table-head>Generado</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in orders" :key="rowIndex" :md-item="row">
              <md-table-cell>{{row.totem.name}}</md-table-cell>
              <md-table-cell>{{row.order_number}}</md-table-cell>
              <md-table-cell>{{row.total_price}}</md-table-cell>
              <md-table-cell>{{row.paymentMethod}}</md-table-cell>
              <md-table-cell>{{row.status}}</md-table-cell>
              <md-table-cell>{{row.created_at}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
        <md-table-pagination
          md-size="5"
          v-bind:md-total="totalRows"
          md-page="1"
          md-label="Registros"
          md-separator="de"
          :md-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"
        ></md-table-pagination>
      </md-table-card>
    </md-layout>
  </div>
</template>

<script>
import HTTP from "@/components/http-common";

export default {
  name: "orders",
  data() {
    return {
      orders: [],
      filter: "",
      sort: {
        name: "order_number",
        type: "desc"
      },
      pag: {
        size: 5,
        page: 1
      },
      totalRows: 0
    };
  },
  methods: {
    fetchOrders() {
      const url = `sales?page=${this.pag.page}&size=${this.pag.size}&sort=${this.sort.name}&type=${this.sort.type}&filter=${this.filter}`;
      HTTP.get(url)
        .then(res => {
          const { rows, count } = res.data;
          this.orders = rows.map(order => {
            const paymentMethod =
              order.payment_method === 1 ? "Tarjeta" : "Cash";
            const status = this.getStatus(order);
            return { ...order, paymentMethod, status };
          });
          this.totalRows = count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      this.pag.page = 1;
      this.fetchOrders();
    },
    onPagination(pag) {
      localStorage.removeItem("url");
      this.pag = pag;
      this.fetchOrders();
    },
    onSort(sort) {
      localStorage.removeItem("url");
      this.sort = sort;
      this.fetchOrders();
    },
    getStatus(order) {
      if (order.status_id === 0) return "Creado";
      return order.status_id === 1 ? "Pagado" : "Finalizado";
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.$root.$data.last_call = "orders";
    this.fetchOrders();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_header {
  width: 20px;
}

.md-table-card {
  margin-top: 18px;
}

.md-table-card .md-toolbar {
  background-color: #e1e0b8;
}

.md-table-card .md-table-head {
  background-color: #f6f5d7;
}
</style>
