'use strict'
const api = require('../service/api')
const models = require('../models')

module.exports = {
  getCurrencies(req, res) {
    const payload = models.Currencies
    api.post('/Query', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  getPaymentMethods(req, res) {
    const payload = models.PaymentMethods
    api.post('/Query', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  getCard(req, res) {
    const payload = models.GetCard
    api.post('/Financial', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  buyRequest(req, res) {
    const { amount, date, receipt } = req.body
    let payload = {
      TransactionAmount: amount,
      OriginalDate: date,
      ReceiptNumber: receipt
    }
    api.post('/Financial', { ...models.Buy, ...payload })
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  confirmPurchase(req, res) {
    const payload = models.ConfirmTransaction
    api.post('/Financial', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  voidPurchase(req, res) {
    const payload = models.Void
    api.post('/Financial', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  getLastTransaction(req, res) {
    const payload = models.GetLastTransaction
    api.post('/Query', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  },
  batchClose(req, res) {
    const payload = models.BatchClose
    api.post('/Financial', payload)
      .then(resp => res.status(200).json(resp.data))
      .catch(err => res.status(400).json({ err }))
  }
}
