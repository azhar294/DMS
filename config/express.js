const glob = require('glob');
const logger = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });
  return app;
};