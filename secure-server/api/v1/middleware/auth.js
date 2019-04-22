const jwt = require('jsonwebtoken')
const CONFIG = require('../config')
const { user, jwt_issuer, jwt_secret, jwt_expiration } = CONFIG

module.exports = {
  validateToken(req, res, next) {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        result = jwt.verify(token, jwt_secret, { expiresIn: jwt_expiration, issuer: jwt_issuer });
        if (result.user !== user) {
          result = {
            error: `Authentication error. Invalid token.`,
            status: 400
          };
          return res.status(400).send(result);
        }
        req.decoded = result
        next();
      } catch (err) {
        return res.status(401).send(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      return res.status(401).send(result);
    }
  }
};