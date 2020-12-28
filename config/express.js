const glob = require('glob');
const bodyParser = require('body-parser');
const errorHandlerMiddleware = require('../helpers/error-handler');

module.exports = (app, config) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use(errorHandlerMiddleware);

  return app;
};
