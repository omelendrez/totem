const CONFIG = {
  backendServerUrl: 'http://192.168.20.250:3000/',
  assetsServerUrl: 'http://192.168.20.250:3010/',
  paymentServer: 'http://192.168.20.249:3030',
  thermalPrintServerURL: 'http://192.168.20.249:3020',
  fiscalPrintServerURL: 'http://192.168.20.250:3060'
}
const intervals = {
  totemtIimeout: 300000, // Time of inactivity for the totem to reset (clean pending basket, reset selected category)
  statusChange: 30000 // Frequency the main App will check for totem status changes
}
const totemId = 1
const drinkFieldName = '{GASEOSA}'

export { CONFIG, totemId, intervals, drinkFieldName }
