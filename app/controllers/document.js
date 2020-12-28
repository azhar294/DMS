const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authorize = require('../../helpers/auth');
const validateRequest = require('../../helpers/validate-request');
const documentService = require('../services/document.service');
const asyncHandler = require('express-async-handler');


module.exports = (app) => {
  app.use('/document', router);
};

// routes
router.post('/create', authorize(), validateCreateRequest, asyncHandler(create));

function validateCreateRequest(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    rootDir: Joi.string().allow('', null).default(null),
    content: Joi.string().allow('', null).default(null),
    type: Joi.string().valid('File', 'Folder').required()
  });
  validateRequest(req, next, schema);
}

async function create(req, res, next) {
  const {name, type, rootDir, content} = req.body;
  await documentService.createDocument({name, type, rootDir, content, user: req.user._id});
  res.json({message: `${type} created successfully`});

}
