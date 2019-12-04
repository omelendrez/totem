import HTTP from '../services/paymentAPI'

/*
  GetCard -> Buy -> Confirm

  No response to Buy ->  GetLastTransaction -> Confirm : It will return the transcation or Cancelled
  If Cancelled -> Start from the beginning

*/

/*
1 - Activate card reader  / GetCard
2 - Send payment          / Buy
3 - Receive response
4 - Confirm transaction   / Confirm
*/

export const activateCCReader = () => {
  return new Promise((resolve, reject) => {
    HTTP.post('/get-card')
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const sendBuyRequest = (amount, date, receipt) => {
  const payload = {
    amount,
    date,
    receipt
  }
  return new Promise((resolve, reject) => {
    HTTP.post('/buy', payload)
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const confirmTransaction = () => {
  return new Promise((resolve, reject) => {
    HTTP.post('/confirm')
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const getLastTransaction = () => {
  return new Promise((resolve, reject) => {
    HTTP.post('/get-last-transaction')
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const batchClose = () => {
  return new Promise((resolve, reject) => {
    HTTP.post('/batch-close')
      .then(resp => HTTP.post('/confirm')
        .then(resp => resolve(resp))
        .catch(err => reject(err)))
      .catch(err => reject(err))
  })
}

export const cancelPayment = payload => {
  return new Promise((resolve, reject) => {
    HTTP.post("void-purchase", payload)
      .then(resp => HTTP.post('/confirm')
        .then(resp => resolve(resp))
        .catch(err => reject(err)))
      .catch(err => reject(err))
  })
}
