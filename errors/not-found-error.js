const RequestError = require('./request-error.js');

class NotFoundError extends RequestError {
    constructor(message, statusCode, meta = {}) {
        super(message, statusCode, meta);
        Error.captureStackTrace(this, NotFoundError);
        let proto = Object.getPrototypeOf(this);
        proto.name = 'NotFoundError';
        this.meta = meta;
    }

    toString() {
        return `${super.toString()} ${JSON.stringify(this.meta)}`;
    }
}

module.exports = NotFoundError;