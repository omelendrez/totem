import axios from 'axios'

const { CONFIG } = require('@/config')
const HTTP3 = axios.create({ baseURL: CONFIG.paymentServer })

export { HTTP3 as default }
