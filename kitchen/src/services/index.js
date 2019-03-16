import servers from '../config'

export const loadKitchenItems = () => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .get('orders/items')
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const changeKitchenItemStatus = data => {
  return new Promise((resolve, reject) => {
    servers.databaseServer
      .put(`orders/items/${data.itemId}`, { status_id: data.statusId })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
