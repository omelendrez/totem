'use strict'
const edge = require('edge-js')
const dllCall = edge.func("./dlls/application.cs")
const getErrorMessage = require('../utils').getErrorMessage
const constants = require('../utils').constants
const defaultValues = require('../utils').defaultValues

const callDll = (payload) => {
  return new Promise((resolve, reject) => {

    dllCall(payload, (err, result) => {
      if (err) reject(err)
      if (result.code > 0) {
        const errorCode = result.code.toString(16)
        result.code = errorCode
        const errorObject = getErrorMessage(errorCode)
        result.message = errorObject ? errorObject.description : 'Unknown error'
      }
      resolve(result)
    })
  })
}

module.exports = {
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
  async printTicket(req, res) {
    const action = 'DailyClose';
    try {
      const result = await callDll({ action, ...defaultValues })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
