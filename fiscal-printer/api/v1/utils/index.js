const errorCodes = require('./errorCodes').errorCodes

const getErrorMessage = errorCode => errorCodes.find(error => error.code === errorCode)

module.exports.getErrorMessage = getErrorMessage