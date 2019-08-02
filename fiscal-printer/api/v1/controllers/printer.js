'use strict'
const edge = require('edge-js')
const dllCall = edge.func("./dlls/application.cs")

module.exports = {
  RunDLL(req, res) {
    const action = req.body.action;
    const data = req.body.data;
    const payload = { action, ...data }
    dllCall(payload, function (err, result) {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    });
  }
}
