require('dotenv').config()

const CONFIG = {
  be_url: process.env.BAKCKEND_URL || 'http://totem-be:3000',
  app: process.env.APP || 'dev',
  port: process.env.PORT || '3020',
  jwt_encryption: process.env.JWT_ENCRYPTION || 'BigSix2019',
  jwt_expiration: process.env.JWT_EXPIRATION || '10000',
  user: process.env.GBL_USER || 'GBL_USER',
  pwd: process.env.GBL_PASSWORD || 'M1a4$1t4E8r0'
}

module.exports = CONFIG