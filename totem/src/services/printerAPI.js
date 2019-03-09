import axios from 'axios'

const { CONFIG } = require('@/config')
const HTTP2 = axios.create({ baseURL: CONFIG.printServerURL })

export { HTTP2 as default }
