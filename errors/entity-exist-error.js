const RequestError = require('./request-error.js');

class EntityExistError extends RequestError {
    constructor(message, statusCode, meta = {}) {
        super(message, statusCode, meta);
        Error.captureStackTrace(this, EntityExistError);
        let proto = Object.getPrototypeOf(this);
        proto.name = 'EntityExistError';
        this.meta = meta;
    }
    toString() {
        return `${super.toString()} ${JSON.stringify(this.meta)}`;
    }
}
module.exports = EntityExistError;
