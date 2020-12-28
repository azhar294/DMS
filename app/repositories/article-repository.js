const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const articleRepository = {
  create: (doc) => {
    return Article.create(doc);
  },
  find: (where, select = null, opts = {}, populate = []) => {
    return Article.find(where, select, opts).populate(populate);
  }
};

module.exports = articleRepository;
