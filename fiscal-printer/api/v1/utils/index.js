const errorCodes = require('./errorCodes').errorCodes
const constants = require('./constants').constants
const defaultValues = require('./config').defaultValues

const getErrorMessage = errorCode => errorCodes.find(error => error.code.toLocaleLowerCase() === errorCode)

module.exports.getErrorMessage = getErrorMessage
module.exports.constants = constants
module.exports.defaultValues = defaultValues