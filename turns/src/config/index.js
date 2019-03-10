import Axios from 'axios'

export const backendServer = 'http://totem-be:3000'

const HTTP = Axios.create({ baseURL: backendServer })

export default HTTP
