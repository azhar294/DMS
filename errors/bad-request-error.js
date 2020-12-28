const RequestError = require('./request-error.js');

class BadRequestError extends RequestError {
  constructor(message, statusCode, meta = {}) {
    super(message, statusCode, meta);
    Error.captureStackTrace(this, BadRequestError);
    let proto = Object.getPrototypeOf(this);
    proto.name = 'BadRequestError';
    this.meta = meta;
  }

  toString() {
    return `${super.toString()} ${JSON.stringify(this.meta)}`;
  }
}

module.exports = BadRequestError;
