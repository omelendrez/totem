import axios from 'axios'

const { CONFIG } = require('@/config')
const HTTP = axios.create({ baseURL: CONFIG.backendServerUrl })

export { HTTP as default }
