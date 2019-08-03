import Axios from 'axios'

export const backendServer = 'http://totem-be:3000'
const printServerURL = 'http://localhost:3020'
const fiscalPrinterURL = 'http://totem-be:3060'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer }),
  printServer: Axios.create({ baseURL: printServerURL }),
  fiscalPrinter:Axios.create({baseURL: fiscalPrinterURL})
}

export default servers
