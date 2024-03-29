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

export const printReportX = order => {
  return new Promise((resolve, reject) => {
    FISCAL.post('/partial-close')
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const printReportZ = order => {
  return new Promise((resolve, reject) => {
    FISCAL.post('/daily-close')
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
