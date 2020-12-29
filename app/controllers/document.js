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
router.patch('/move', authorize(), validateMoveRequest, asyncHandler(moveFile));
router.get('/list', authorize(), asyncHandler(listDocuments));

function validateCreateRequest(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    parentDir: Joi.string().allow('', null).default(null),
    content: Joi.string().allow('', null).default(null),
    type: Joi.string().valid('File', 'Folder').required()
  });
  validateRequest(req, next, schema);
}

async function create(req, res, next) {
  const {name, type, parentDir, content} = req.body;
  await documentService.createDocument({name, type, parentDir, content, user: req.user._id});
  res.json({message: `${type} created successfully`});

}


function validateMoveRequest(req, res, next) {
  const schema = Joi.object({
    file: Joi.string().required(),
    folder: Joi.string().allow('', null).default(null)
  });
  validateRequest(req, next, schema);
}


async function moveFile(req, res, next) {
  const {file, folder} = req.body;
  await documentService.moveFile({file, folder, user: req.user._id});
  res.json({message: `File moved successfully`});
}

async function listDocuments(req, res, next) {
  const {folder} = req.query;
  let documents = await documentService.listDocuments({folder, user: req.user._id});
  res.json(documents);
}
