const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../helpers/validate-request');
const userService = require('../services/user.service');


module.exports = (app) => {
  app.use('/user', router);
};

// routes
router.post('/register', validateUserSchema, register);
router.post('/authenticate', authenticateSchema, authenticate);

function validateUserSchema(req, res, next) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

async function register(req, res, next) {
  const {userName, password} = req.body;
  try {
    await userService.register({userName, password});
    res.json({message: 'user account created successfully'});
  } catch (err) {
    next(err);
  }
}



function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

async function authenticate(req, res, next) {
    const { userName, password } = req.body;
    try {
    res.json(await userService.authenticate({ userName, password }));
    } catch(err){
        next(err);
    }

}
