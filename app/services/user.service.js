const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userRepository = require('../repositories/user-repository');
const EntityExistError = require('../../errors/entity-exist-error');
const BadRequestError = require('../../errors/bad-request-error');

module.exports = {
  register,
  authenticate
};

async function register(params) {
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
  await userRepository.create(userAccount);

}


async function authenticate({userName, password}) {
  const user = await userRepository.findOne({userName});
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw new BadRequestError('UserName or password is incorrect', 400);
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {jwtToken};
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({sub: account.id, id: account.id}, config.jwt.secret, {expiresIn: '15m'});
}
