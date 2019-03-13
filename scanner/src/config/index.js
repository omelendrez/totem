import Axios from 'axios'

export const backendServer = 'http://totem-be:3000'
const printServerURL = 'http://localhost:9000'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer }),
  printServer: Axios.create({ baseURL: printServerURL })
}

export default servers
