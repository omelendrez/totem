import servers from '../config'

export const loadTurns = () => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .get('orders/order_turns')
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

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

export const printOrder = order => {
  return new Promise((resolve, reject) => {
    servers.printServer
      .post(`/${order.printerId}`, { order })
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
      .post('printer-error', errorData)
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
      .post('/partial-close')
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
      .post('/daily-close')
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

export const printOrderFiscal = order => {
  return new Promise((resolve, reject) => {
    servers.fiscalPrinter
      .post('/print-ticket', { order })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
