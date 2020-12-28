const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'dms'
    },
    jwt : {
      secret : "secret"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo:27017/dms-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'dms'
    },
    jwt : {
      secret : "secret"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/dms-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'dms'
    },
    jwt : {
      secret : "secret"
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/dms-production'
  }
};

module.exports = config[env];

