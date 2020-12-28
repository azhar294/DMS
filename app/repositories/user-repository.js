const mongoose = require('mongoose');
const User = mongoose.model('User');
const userRepository = {
  create: (doc) => {
    return User.create(doc);
  },
  findOne: (where, select = null, opts = {}, populate = []) => {
    return User.findOne(where, select, opts).populate(populate);
  }
};

module.exports = userRepository;
