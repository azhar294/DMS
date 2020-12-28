const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const articleRepository = require('../repositories/article-repository')


module.exports = (app) => {
  app.use('/', router);
};

router.get('/', asyncHandler(async (req, res, next) => {
  let article = {title: 'test'};
  await articleRepository.create(article);
  let articles = await articleRepository.find();
  return res.json(articles);
}));
