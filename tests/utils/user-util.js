const bcrypt = require('bcryptjs');
const userRepository = require('../../app/repositories/user-repository');

async function createUser(doc) {
  doc.passwordHash = bcrypt.hashSync(doc.password, 10);
  delete doc.password;
  return await userRepository.create(doc);
}

module.exports = {
  createUser
};
