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
