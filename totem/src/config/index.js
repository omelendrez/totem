const CONFIG = {
  backendServerUrl: 'http://totem-be:3000/',
  assetsServerUrl: 'http://totem-be:3010/',
  printServerURL: 'http://localhost:9000'
}
const intervals = {
  totemtIimeout: 60000, // Time of inactivity for the totem to reset (clean pending basket, reset selected category)
  statusChange: 20000 // Frequency the main App will check for totem status changes
}
const totemId = 1
const drinkFieldName = '{GASEOSA}'

export { CONFIG, totemId, intervals, drinkFieldName }
