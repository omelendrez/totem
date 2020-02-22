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

export const activateTotem = totemId => {
  return new Promise((resolve, reject) => {
    HTTP.put(`totem/activate/${totemId}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const deactivateTotem = totemId => {
  return new Promise((resolve, reject) => {
    HTTP.put(`totem/de-activate/${totemId}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}