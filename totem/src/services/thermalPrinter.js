import THERMAL from './thermalPrinterAPI'

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
