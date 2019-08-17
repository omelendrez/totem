import Axios from 'axios'

export const backendServer = 'http://TOTEM00:3000'
const printServerURL = 'http://TOTEM00:3020'
const fiscalPrinterURL = 'http://TOTEM00:3060'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer }),
  printServer: Axios.create({ baseURL: printServerURL }),
  fiscalPrinter: Axios.create({ baseURL: fiscalPrinterURL })
}

export default servers
