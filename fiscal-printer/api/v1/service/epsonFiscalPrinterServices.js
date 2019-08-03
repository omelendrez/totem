const edge = require('edge-js')
const dllCall = edge.func("./dlls/application.cs")
const getErrorMessage = require('../utils').getErrorMessage

const callDll = (payload) => {
  return new Promise((resolve, reject) => {
    dllCall(payload, (err, result) => {
      if (err) {
        reject(err)
      } else {
        if (result.code > 0) {
          const errorCode = result.code.toString(16)
          result.code = errorCode
          const errorObject = getErrorMessage(errorCode)
          result.message = errorObject ? errorObject.description : 'Unknown error'
        }
        resolve(result)
      }
    })
  })
}

module.exports.callDll = callDll