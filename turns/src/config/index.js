import Axios from 'axios'

export const backendServer = 'http://totem00:3000'
const printServerURL = 'http://totem00:3020'
const fiscalPrinterURL = 'http://totem00:3060'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer }),
  printServer: Axios.create({ baseURL: printServerURL }),
  fiscalPrinter: Axios.create({ baseURL: fiscalPrinterURL })
}

export default servers
