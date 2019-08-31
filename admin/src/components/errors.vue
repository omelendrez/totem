<template>
  <div class="errors">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Errores</h1>
    </md-toolbar>

    <md-layout md-align="center">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Errores de impresión</h1>
          <input class="md-input" v-model="filter" id="search_field" @keyup="search" />
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>

        <md-table @sort="onSort" md-sort="order_number">
          <md-table-header>
            <md-table-row>
              <md-table-head>Error #</md-table-head>
              <md-table-head md-sort-by="order_number">Ticket</md-table-head>
              <md-table-head>Impresora</md-table-head>
              <md-table-head>ID impresora</md-table-head>
              <md-table-head>URL</md-table-head>
              <md-table-head>Mensaje de error</md-table-head>
              <md-table-head>Generado</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in errors" :key="rowIndex" :md-item="row">
              <md-table-cell>{{row.id}}</md-table-cell>
              <md-table-cell>{{row.order_number}}</md-table-cell>
              <md-table-cell>{{row.printer_name}}</md-table-cell>
              <md-table-cell>{{row.printer_id}}</md-table-cell>
              <md-table-cell>{{row.printer_interface}}</md-table-cell>
              <md-table-cell>{{row.error_message}}</md-table-cell>
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
  name: "errors",
  data() {
    return {
      errors: [],
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
    fetchErrors() {
      const url = `printer-error?page=${this.pag.page}&size=${this.pag.size}&sort=${this.sort.name}&type=${this.sort.type}&filter=${this.filter}`;
      HTTP.get(url)
        .then(res => {
          const { rows, count } = res.data;
          this.errors = rows;
          this.totalRows = count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      this.pag.page = 1;
      this.fetchErrors();
    },
    onPagination(pag) {
      localStorage.removeItem("url");
      this.pag = pag;
      this.fetchErrors();
    },
    onSort(sort) {
      localStorage.removeItem("url");
      this.sort = sort;
      this.fetchErrors();
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.$root.$data.last_call = "errors";
    this.fetchErrors();
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
