import servers from '../config'

export const changeOrderStatus = orderId => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .put(`orders/${orderId}`)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const loadOrderData = orderId => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .get(`orders/${orderId}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const printOrder = orderData => {
  return new Promise((resolve, reject) => {
    servers.printServer
      .post(`/${orderData.printerId}`, { orderData })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const printerError = errorData => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .post(`orders/printer-error`, errorData)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const setOrderPrinted = orderId => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .put(`orders/printed/${orderId}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const informeX = () => {
  return new Promise((resolve, reject) => {
    servers.fiscalPrinter
      .post('partial-close')
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const informeZ = () => {
  return new Promise((resolve, reject) => {
    servers.fiscalPrinter
      .post('daily-close')
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const activateTotem = totemId => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .put(`totem/activate/${totemId}`)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const deActivateTotem = totemId => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .put(`totem/de-activate/${totemId}`)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
