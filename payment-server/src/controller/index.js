'use strict'
const SimpleTransactionPosnetDeviceIntegratorApi = require('../index');
const QuerySvc = new SimpleTransactionPosnetDeviceIntegratorApi.QueryApi();

module.exports = {
  getCurrencies(req, res) {
    const CurrenciesRequestModel = new SimpleTransactionPosnetDeviceIntegratorApi.CurrenciesRequest();
    CurrenciesRequestModel.TransactionRequestType = "Currencies"
    const callback = function (error, data, response) {
      if (error) {
        console.table(error);
        res.status(400).json(error)
      } else {
        res.status(200).json(data, response)
      }
    }
    QuerySvc.currencies(CurrenciesRequestModel, callback)
  },
  getPaymentMethods(req, res) {
    const PaymentMethodsRequestModel = new SimpleTransactionPosnetDeviceIntegratorApi.PaymentMethodsRequest();
    PaymentMethodsRequestModel.TransactionRequestType = "PaymentMethods"
    const callback = function (error, data, response) {
      if (error) {
        console.table(error);
        res.status(400).json(error)
      } else {
        res.status(200).json(data, response)
      }
    }
    QuerySvc.paymentMethods(PaymentMethodsRequestModel, callback)
  }
}
