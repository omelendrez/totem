import axios from 'axios'

const { CONFIG } = require('@/config')
const FISCAL = axios.create({ baseURL: CONFIG.fiscalPrintServerURL })

export { FISCAL as default }
