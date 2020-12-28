const RequestError = require('../errors/request-error');
const logger = require('../helpers/logger');

function errorHandlerMiddleware(error, req, res, next) {
  //logging error
  logger.error(error);
  if (error.name === 'UnauthorizedError') {
    res.status(401).send({success: false, message: error.message});
    return;
  }
  if (error instanceof RequestError) {
    res.status(error.statusCode).json({success: false, message: error.message, meta: error.meta});
  } else {
    res.status(500).json({success: false, message: 'Internal Server Error'});
  }
}

module.exports = errorHandlerMiddleware;
