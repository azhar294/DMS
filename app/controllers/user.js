const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../helpers/validate-request');
const userService = require('../services/user.service');
const asyncHandler = require('express-async-handler');
const authorize = require('../../helpers/auth');


module.exports = (app) => {
  app.use('/user', router);
};

// routes
router.post('/register', authorize(true), validateUserSchema, asyncHandler(register));
router.post('/authenticate', authenticateSchema, asyncHandler(authenticate));

function validateUserSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

async function register(req, res, next) {
  const {userName, password} = req.body;
  await userService.register({userName, password});
  res.json({message: 'user account created successfully'});
}


function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

async function authenticate(req, res, next) {
  const {userName, password} = req.body;
  res.json(await userService.authenticate({userName, password}));
}
