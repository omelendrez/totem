import Axios from 'axios'

export const backendServer = 'http://192.168.20.250:3000'
const printServerURL = 'http://192.168.20.250:3020'
const fiscalPrinterURL = 'http://192.168.20.250:3060'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer }),
  printServer: Axios.create({ baseURL: printServerURL }),
  fiscalPrinter: Axios.create({ baseURL: fiscalPrinterURL })
}

export default servers
