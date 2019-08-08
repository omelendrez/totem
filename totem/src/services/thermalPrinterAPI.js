import axios from 'axios'

const { CONFIG } = require('@/config')
const THERMAL = axios.create({ baseURL: CONFIG.thermalPrintServerURL })

export { THERMAL as default }
