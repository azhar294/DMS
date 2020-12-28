

const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV;

if(env !== 'test'){
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});
}

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = express();

const server = require('./config/express')(app, config);
module.exports = server;
