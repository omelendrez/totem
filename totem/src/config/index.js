const CONFIG = { url: 'http://totem-be:3000/', url2: 'http://totem-be:9000' }
const intervals = {
  totemtIimeout: 300000,  // Time of inactivity for the totem to reset (clean pending basket, reset selected category)
  orderUpdates: 10000,    // Frequency for the Tunrns and Kitchen views to check for database updates
  statusChange: 10000     // Frequency the main App will check for totem status changes
}
const totemId = 1
const drinkFieldName = '{GASEOSA}'

export { CONFIG, totemId, intervals, drinkFieldName }
