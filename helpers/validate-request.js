const BadRequestError = require('../errors/bad-request-error');

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const {error, value} = schema.validate(req.body, options);
  if (error) {
    next(new BadRequestError(`Validation error: ${error.details.map(x => x.message).join(', ')}`, 400));
  } else {
    req.body = value;
    next();
  }
}

module.exports = validateRequest;
