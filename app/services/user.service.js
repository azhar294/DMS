const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userRepository = require('../repositories/user-repository');
const EntityExistError = require('../../errors/entity-exist-error');
const BadRequestError = require('../../errors/bad-request-error');

module.exports = {
  register
};

async function register(params, origin) {
  // validate
  if (await userRepository.findOne({userName: params.userName})) {
    throw new EntityExistError('User Already Exist', 409)
  }

  // create account object
  const userAccount = {
    userName: params.userName
  };

  // hash password
  userAccount.passwordHash = hash(params.password);

  // save account
  await userRepository.create();

}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

