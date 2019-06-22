import HTTP from '../services/paymentAPI'
/*
1 - Activate card reader
2 - Send payment
3 - Receive response
4 - Confirm transaction
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

export const confirmTransaction = (amount, date, receipt) => {
  return new Promise((resolve, reject) => {
    HTTP.post('/confirm')
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}
