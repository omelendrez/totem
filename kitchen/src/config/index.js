import Axios from 'axios'

export const refreshInterval = 10000
export const backendServer = 'http://totem-be:3000'

const servers = {
  databaseServer: Axios.create({ baseURL: backendServer })
}

export default servers
