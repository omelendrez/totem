'use strict'

module.exports = {
  Currencies: {
    TransactionRequestType: "Currencies"
  },
  PaymentMethods: {
    TransactionRequestType: "PaymentMethods"
  },
  GetCard: {
    TransactionRequestType: "GetCard",
    TransactionType: "Buy"
  },
  Buy: {
    TransactionRequestType: "Buy",
    TransactionResolutionMode: "Online",
    TransactionCurrencyCode: "032",
    TransactionAmount: 0,
    TransactionInstallments: 1,
    OriginalDate: null,
    ReceiptNumber: '',
    TicketsToPrint: ['Customer']
  },
  ConfirmTransaction: {
    TransactionRequestType: "ConfirmTransaction"
  },
  GetLastTransaction: {
    TransactionRequestType: "GetLastTransaction"
  },
  BatchClose: {
    TransactionRequestType: "BatchClose"
  }
}