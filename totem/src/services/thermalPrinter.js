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

export const printStockThermal = order => {
  return new Promise((resolve, reject) => {
    THERMAL.post(`/stock/${order.printerId}`, { order })
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
    HTTP.post('/printer-error', { printError })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
