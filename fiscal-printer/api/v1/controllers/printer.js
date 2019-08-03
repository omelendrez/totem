'use strict'
const callDll = require('../service/epsonFiscalPrinterServices').callDll
const defaultValues = require('../config').defaultValues
const constants = require('../utils').constants

module.exports = {
  async default(req, res) {
    res.status(401).json({ message: 'Invalid endpoint' })
  },
  async connectFiscal(req, res) {
    const action = 'Connect';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async partialClose(req, res) {
    const action = 'PartialClose';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async dailyClose(req, res) {
    const action = 'DailyClose';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async getFiscalStatus(req, res) {
    const action = 'GetFiscalStatus';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async getPrinterStatus(req, res) {
    const action = 'GetPrinterStatus';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async printTicket(req, res) {
    const docType = constants.ID_TIPO_COMPROBANTE_TIQUET
    const itemDefaults = {
      id_modificador: constants.ID_MODIFICADOR_AGREGAR,
      id_tasa_iva: constants.ID_TASA_IVA_21_00,
      ii_id: constants.ID_IMPUESTO_NINGUNO,
      ii_valor: "",
      id_codigo: constants.ID_CODIGO_INTERNO,
      codigo_unidad_matrix: "",
      codigo_unidad_medida: constants.AFIP_CODIGO_UNIDAD_MEDIDA_UNIDAD
    }
    const orderItems = req.body.order.order_items
    const items = orderItems.map(item => {
      item.quantity = item.quantity.toString()
      item.total_price = item.total_price.toString()
      return item
    })

    try {
      let result = await callDll({ action: 'OpenDocument', ...defaultValues, docType })
      items.map(item => {
        const payload = { ...item, ...itemDefaults }
        result = callDll({ action: 'PrintItem', ...payload, ...defaultValues })
      })
      result = await callDll({ action: 'PrintSubtotal', ...defaultValues })
      //result = await callDll({ action: 'CloseDocument', ...defaultValues })
      result = await callDll({ action: 'Cancel', ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
