import axios from 'axios'

const { CONFIG } = require('@/config')
const HTTP2 = axios.create({ baseURL: CONFIG.url2 })

export { HTTP2 as default }
