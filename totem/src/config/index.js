const CONFIG = {
  backendServerUrl: "http://totem00:3000/",
  assetsServerUrl: "http://totem00:3010/",
  paymentServer: "http://totem01:3030",
  thermalPrintServerURL: "http://totem01:3020",
  fiscalPrintServerURL: "http://totem00:3060"
}
const intervals = {
  totemtIimeout: 180000, // Time of inactivity for the totem to reset (clean pending basket, reset selected category, reload categories and products from server)
  statusChange: 30000 // Frequency the main App will check for totem status changes
}
const totemId = 1
const drinkFieldName = "{GASEOSA}"

export { CONFIG, totemId, intervals, drinkFieldName }
