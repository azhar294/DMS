const server = require('./app');
const config = require('./config/config');
const logger = require('./helpers/logger');
server.listen(config.port, () => {
    logger.info('Express server listening on port ' + config.port);
 });
