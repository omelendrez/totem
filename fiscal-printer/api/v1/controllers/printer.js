'use strict'
// Install python
// install node-gyp
// Install .NET Framework 2.0 SDK
const edge = require('edge-js')

module.exports = {
  async test(req, res) {
    var clrMethod = edge.func({
      assemblyFile: 'EpsonFiscalInterface.dll',
      typeName: 'EPSON_Impresora_Fiscal.PrinterFiscal',
      methodName: 'ConsultarVersionDll' // This must be Func<object,Task<object>>
    });
    clrMethod("", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
}
