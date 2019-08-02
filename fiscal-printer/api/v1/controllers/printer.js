'use strict'
const edge = require('edge-js')
const dllCall = edge.func("./dlls/application.cs")
const errorCodes = require('../utils/errors')

module.exports = {
  RunDLL(req, res) {
    const action = req.body.action;
    const data = req.body.data;
    const payload = { action, ...data }
    dllCall(payload, function (err, result) {
      if (err) return res.status(500).json(err)
      if (result.code > 0) {
        const errorCode = result.code.toString(16)
        result.code = errorCode
        result.message = errorCodes.find(error => error.code === errorCode)
      }
      res.status(200).json(result)
    });
  }
}
