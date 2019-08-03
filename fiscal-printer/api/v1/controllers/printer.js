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
  connectFiscal(req, res) {
    const action = 'Connect';
    callDll({ action, ...defaultValues })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err))
  },
  partialClose(req, res) {
    const action = 'PartialClose';
    callDll({ action, ...defaultValues })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err))
  },
  dailyClose(req, res) {
    const action = 'DailyClose';
    callDll({ action, ...defaultValues })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err))
  }
}
