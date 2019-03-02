import HTTP from './api'

export const checkTotemStatus = totemId => {
  return new Promise((resolve, reject) => {
    HTTP.get(`totem/${totemId}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
