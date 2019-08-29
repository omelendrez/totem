import THERMAL from './thermalPrinterAPI'
import HTTP from './api'

export const printOrderThermal = order => {
  return new Promise((resolve, reject) => {
    THERMAL.post(`/${order.printerId}`, { order })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const printOrderThermalError = printError => {
  return new Promise((resolve, reject) => {
    HTTP.post('/printer_error', { printError })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
