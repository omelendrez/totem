const jwt = require('jsonwebtoken')
const CONFIG = require('../config')
const { user, pwd, jwt_issuer, jwt_secret, jwt_expiration } = CONFIG

module.exports = {
  login(req, res) {
    const { username, password } = req.body
    let result = ''
    if (username !== user || password !== pwd) {
      result = {
        error: `Authentication error. Invalid credentials.`,
        status: 401
      };
      res.status(401).send(result);
    }
    const token = jwt.sign({ user: username }, jwt_secret, { expiresIn: jwt_expiration, issuer: jwt_issuer });
    const status = 200
    result = {
      token,
      status,
      user
    }
    res.status(200).json(result)
  }
}
