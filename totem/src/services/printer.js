import HTTP2 from './printerAPI'

export const printOrder = orderData => {
  return new Promise((resolve, reject) => {
    HTTP2.post('/', { orderData })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
