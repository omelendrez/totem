import FISCAL from './fiscalPrinterAPI'

export const printOrderFiscal = order => {
  return new Promise((resolve, reject) => {
    FISCAL.post('/print-ticket', { order })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
