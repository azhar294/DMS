const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {
  let article = new Article();
  article.title = "test";
  await article.save();
  
  let articles =   await Article.find();
  return res.json(articles);
});
