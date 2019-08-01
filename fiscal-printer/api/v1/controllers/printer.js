'use strict'
const edge = require('edge-js')

module.exports = {
  async test(req, res) {
    const ConsultarVersionDll = edge.func({
      source: "application.cs",
      //assemblyFile: "EpsonFiscalInterface.dll",
      //typeName: "EpsonFiscalInterface",
      methodName: 'ConsultarVersionDll' // This must be Func<object,Task<object>>
    });
    ConsultarVersionDll("", function (err, result) {
      if (err) return res.status(500).json(err)
      res.status(200).json(result)
    });
  }
}
