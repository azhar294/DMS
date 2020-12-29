const mongoose = require('mongoose');
const Document = mongoose.model('Document');
const documentRepository = {
  create: (doc) => {
    return Document.create(doc);
  },
  findOne: (where, select = null, opts = {}, populate = []) => {
    return Document.findOne(where, select, opts).populate(populate);
  },
  find: (where, select = null, opts = {}, populate = []) => {
    return Document.find(where, select, opts).populate(populate);
  }
};

module.exports = documentRepository;
