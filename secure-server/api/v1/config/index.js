require('dotenv').config()

const CONFIG = {
  be_url: process.env.BAKCKEND_URL || 'http://totem00:3000',
  app: process.env.APP || 'dev',
  port: process.env.PORT || '3040',
  jwt_secret: process.env.JWT_SECRET || 'bigsixofficialtotemapiintegration',
  jwt_expiration: process.env.JWT_EXPIRATION || '1d',
  user: process.env.GBL_USER || 'app_user@bigsix.com',
  pwd: process.env.GBL_PASSWORD || 'M1a4$1t4E8r0',
  jwt_issuer: process.env.TOKEN_ISSUER || 'http://totem00'
}

module.exports = CONFIG