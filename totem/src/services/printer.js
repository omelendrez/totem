import HTTP2 from './printerAPI'

export const printOrder = order => {
  return new Promise((resolve, reject) => {
    HTTP2.post(`/${order.printerId}`, { order })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
