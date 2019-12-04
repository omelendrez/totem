import HTTP from "./api"

export const savePayment = payment => {
  return new Promise((resolve, reject) => {
    HTTP.post("cc-payment", payment)
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}

export const getPayments = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("cc-payment")
      .then(resp => resolve(resp))
      .catch(err => reject(err))
  })
}
