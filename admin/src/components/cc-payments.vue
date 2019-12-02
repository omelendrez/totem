<template>
  <div class="cc-payments">
    <md-toolbar class="md-primary">
      <h1 class="md-title">Pagos con Tarjeta</h1>
    </md-toolbar>

    <md-layout md-align="center">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">Pagos con Tarjeta</h1>
        </md-toolbar>

        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Ticket #</md-table-head>
              <md-table-head>Tarjeta</md-table-head>
              <md-table-head>Número</md-table-head>
              <md-table-head>Importe</md-table-head>
              <md-table-head>Fecha</md-table-head>
              <md-table-head>Hora</md-table-head>
              <md-table-head>Transacción</md-table-head>
              <md-table-head>Respuesta</md-table-head>
              <md-table-head>Mensaje</md-table-head>
              <md-table-head>Acciones</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in payments" :key="rowIndex" :md-item="row">
              <md-table-cell>{{row.order_number}}</md-table-cell>
              <md-table-cell>{{row.response.IssuerEntity ||row.response.PaymentMethodDescription}}</md-table-cell>
              <md-table-cell>{{row.response.CardNumber}}</md-table-cell>
              <md-table-cell>{{row.amount}}</md-table-cell>
              <md-table-cell>{{row.response.TransactionDate}}</md-table-cell>
              <md-table-cell>{{row.response.TransactionTime}}</md-table-cell>
              <md-table-cell>{{row.response.TransactionResponseType || row.response.action}}</md-table-cell>
              <md-table-cell>{{row.response.ResponseActions}}</md-table-cell>
              <md-table-cell>{{row.response.ResultCode}}</md-table-cell>
              <md-table-cell>
                <md-button
                  v-if="row.response.TransactionAmount"
                  class="md-accent md-raised"
                  v-on:click.native="openDialog('confirmChange', row)"
                >Cancelar</md-button>
              </md-table-cell>
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
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content="confirm.content"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @close="onClose"
      ref="confirmChange"
    ></md-dialog-confirm>
    <md-dialog ref="errorBox">
      <md-dialog-title>{{errorMsg.title}}</md-dialog-title>
      <md-dialog-content>{{errorMsg.content}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="closeErrorMsg('errorBox')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import HTTP from "@/components/http-common";
import HTTP2 from "@/components/http-payments";

export default {
  name: "CCPayments",
  data() {
    return {
      payments: [],
      pag: {
        size: 5,
        page: 1
      },
      totalRows: 0,
      confirm: {
        title: "",
        content: "Está seguro que desea cancelar este pago?",
        ok: "Si",
        cancel: "No"
      },
      record: null,
      errorMsg: {
        title: "",
        content: ""
      },
      interval: 0
    };
  },
  methods: {
    fetchCCPayments() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      const url = `cc-payment?page=${this.pag.page}&size=${this.pag.size}`;
      this.interval = setInterval(() => {
        this.fetchCCPayments();
      }, 3000);
      HTTP.get(url)
        .then(res => {
          const { rows, count } = res.data;
          this.payments = rows.map(row => ({
            id: row.id,
            orderId: row.order_id,
            order_number: row.order.order_number,
            amount: row.order.total_price,
            response: JSON.parse(row.response)
          }));
          this.totalRows = count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onPagination(pag) {
      localStorage.removeItem("url");
      this.pag = pag;
      this.fetchCCPayments();
    },
    openDialog(ref, row) {
      this.confirm.title = row.ReceiptNumber;
      this.$refs[ref].open();
      this.record = row;
    },
    showErrorMsg(ref) {
      this.$refs[ref].open();
    },
    closeErrorMsg(ref) {
      this.$refs[ref].close();
    },
    onClose(type) {
      if (type === "ok") {
        const {
          TransactionAmount,
          HostTicketNumber,
          TransactionDate,
          ReceiptNumber
        } = this.record.response;
        const payload = {
          amount: TransactionAmount,
          ticket: HostTicketNumber,
          date: TransactionDate,
          receipt: ReceiptNumber
        };
        HTTP2.post("void-purchase", payload)
          .then(resp => {
            const response = {
              orderId: this.record.orderId,
              response: JSON.stringify({ ...resp.data, action: "Void" })
            };
            HTTP.post("cc-payment", response)
              .then(() => {
                this.fetchCCPayments();
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            this.errorMsg = {
              title: "Error al cambiar status",
              content: `Ha ocurrido un error al intentar cambiar status de ${this.record.name}`
            };
            this.showErrorMsg("errorBox");
            console.log(err);
          });
      }
    }
  },
  created() {
    if (!this.$root.$data.logged) {
      this.$router.push({ name: "Login" });
    }
    this.$root.$data.last_call = "ccpayments";
    this.fetchCCPayments();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
