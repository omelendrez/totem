require('dotenv').config()

const CONFIG = {}

CONFIG.app = process.env.APP || 'dev'
CONFIG.port = process.env.PORT || '3020'

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'bigsix'
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000'

module.exports = CONFIG
